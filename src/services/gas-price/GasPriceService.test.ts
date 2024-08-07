import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import Etherscan from "../../adapters/gas-price/etherscan/Etherscan.ts";
import Viem from "../../adapters/gas-price/viem/Viem.ts";
import { newClient } from "../../utils/index.ts";
import gasPriceService from "./GasPriceService.ts";
import type { EtherscanData } from "../../adapters/gas-price/etherscan/types.ts";

// Mock dependencies
vi.mock("../../adapters/gas-price/etherscan/Etherscan.ts");
vi.mock("../../adapters/gas-price/viem/Viem.ts");
vi.mock("../../utils/index.ts");

describe("GasPriceService", () => {
  let mockedEtherscan: Etherscan;
  let mockedViem: Viem;

  const validResponse: EtherscanData = {
    status: "1",
    message: "OK",
    result: {
      LastBlock: 14856877,
      SafeGasPrice: 100,
      ProposeGasPrice: 120,
      FastGasPrice: 150,
      suggestBaseFee: 150,
      gasUsedRatio: "150",
    },
  };

  beforeEach(async () => {
    mockedEtherscan = new Etherscan("");
    mockedViem = new Viem(await newClient());

    vi.spyOn(mockedEtherscan, "getGasPrice").mockResolvedValue(validResponse);
    vi.spyOn(mockedViem, "getGasPrice").mockResolvedValue({
      average: BigInt(200),
      high: BigInt(250),
    });

    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    gasPriceService["etherscan"] = mockedEtherscan;
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    gasPriceService["viem"] = mockedViem;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("initializeViem", () => {
    it("should throw an error if Viem initialization fails", async () => {
      vi.mocked(newClient).mockRejectedValueOnce(
        new Error("Initialization failed")
      );

      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      await expect(gasPriceService["initializeViem"]()).rejects.toThrow(
        new Error("Failed to initialize Viem client.")
      );
    });
  });

  describe("getGasPrice", () => {
    it("should return gas price from Etherscan if successful", async () => {
      const data = await gasPriceService.getGasPrice();
      expect(data).toEqual({
        average: BigInt(validResponse.result.SafeGasPrice) * BigInt(1000000000),
        high: BigInt(validResponse.result.FastGasPrice) * BigInt(1000000000),
        baseFee:
          BigInt(validResponse.result.suggestBaseFee) * BigInt(1000000000),
      });
    });

    it("should fall back to Viem if Etherscan call fails", async () => {
      vi.spyOn(mockedEtherscan, "getGasPrice").mockRejectedValueOnce(
        new Error("Etherscan failed")
      );

      const data = await gasPriceService.getGasPrice();
      expect(data).toEqual({
        average: BigInt(200),
        high: BigInt(250),
        baseFee: 0n,
      });
    });
  });
});
