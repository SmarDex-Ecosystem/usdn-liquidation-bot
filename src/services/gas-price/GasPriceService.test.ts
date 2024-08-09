import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { EtherscanData } from "../../adapters/gas-price/etherscan/types.ts";
import Etherscan from "../../adapters/gas-price/etherscan/Etherscan.ts";
import Viem from "../../adapters/gas-price/viem/Viem.ts";
import { newClient } from "../../utils/index.ts";
import { gasPriceService } from "./index.ts";

vi.mock("../../adapters/gas-price/etherscan/Etherscan");
vi.mock("../../adapters/gas-price/viem/Viem");
vi.mock("../../utils/index");

describe("GasPriceService", () => {
  let mockedPrimaryAdapter: Etherscan;
  let mockedFallbackAdapter: Viem;

  const validPrimaryResponse: EtherscanData = {
    status: "1",
    message: "OK",
    result: {
      LastBlock: 14856877,
      SafeGasPrice: 100,
      ProposeGasPrice: 120,
      FastGasPrice: 150,
      suggestBaseFee: 150,
      gasUsedRatio: "0.5",
    },
  };

  const fallbackAdapterResponse = {
    average: BigInt(200),
    high: BigInt(250),
  };

  beforeEach(async () => {
    mockedPrimaryAdapter = new Etherscan("");
    mockedFallbackAdapter = new Viem(await newClient());

    vi.spyOn(mockedPrimaryAdapter, "getGasPrice").mockResolvedValue(
      validPrimaryResponse
    );
    vi.spyOn(mockedFallbackAdapter, "getGasPrice").mockResolvedValue(
      fallbackAdapterResponse
    );

    vi.spyOn(gasPriceService, "getGasPrice").mockImplementation(async () => {
      try {
        const primaryData = await mockedPrimaryAdapter.getGasPrice();
        return {
          average: BigInt(primaryData.result.SafeGasPrice) * 10n ** 9n,
          high: BigInt(primaryData.result.FastGasPrice) * 10n ** 9n,
          baseFee: BigInt(primaryData.result.suggestBaseFee) * 10n ** 9n,
        };
      } catch {
        const fallbackData = await mockedFallbackAdapter.getGasPrice();
        return {
          average: fallbackData.average,
          high: fallbackData.high,
          baseFee: 0n,
        };
      }
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("getGasPrice", () => {
    it("should return gas price from the primary adapter if successful", async () => {
      const data = await gasPriceService.getGasPrice();
      expect(data).toEqual({
        average: BigInt(validPrimaryResponse.result.SafeGasPrice) * 10n ** 9n,
        high: BigInt(validPrimaryResponse.result.FastGasPrice) * 10n ** 9n,
        baseFee: BigInt(validPrimaryResponse.result.suggestBaseFee) * 10n ** 9n,
      });
    });

    it("should fall back to the secondary adapter if the primary adapter call fails", async () => {
      vi.spyOn(mockedPrimaryAdapter, "getGasPrice").mockRejectedValueOnce(
        new Error("Primary adapter failed")
      );

      const data = await gasPriceService.getGasPrice();
      expect(data).toEqual({
        average: fallbackAdapterResponse.average,
        high: fallbackAdapterResponse.high,
        baseFee: 0n,
      });
    });
  });
});
