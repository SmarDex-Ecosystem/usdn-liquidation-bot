import { describe, expect, it, vi } from "vitest";
import GasPrice from "./Viem.ts";
import { PublicClient } from "viem";

// Mocking viem and PublicClient
vi.mock("viem", () => {
  const getGasPrice = vi.fn();
  return {
    PublicClient: vi.fn(() => ({
      getGasPrice,
    })),
  };
});

// Mock implementation of newClient
const newClient = vi.fn(() => new PublicClient());

describe("GasPrice", () => {
  describe("getGasPrice", () => {
    it("should return valid data", async () => {
      // Mocking the getGasPrice method of the PublicClient instance
      const validGasPrice = 100000n;
      const mockedClientInstance = await newClient();
      mockedClientInstance.getGasPrice.mockResolvedValue(validGasPrice);

      const gasPrice = new GasPrice(mockedClientInstance);
      const data = await gasPrice.getGasPrice();
      expect(data.average).toEqual(100000n);
      expect(data.high).toEqual(200000n);
    });

    it("should return valid 0n", async () => {
      // Mocking the getGasPrice method of the PublicClient instance to return 0n
      const validGasPrice = 0n;
      const mockedClientInstance = await newClient();
      mockedClientInstance.getGasPrice.mockResolvedValue(validGasPrice);

      const gasPrice = new GasPrice(mockedClientInstance);
      const data = await gasPrice.getGasPrice();
      expect(data.average).toEqual(0n);
      expect(data.high).toEqual(0n);
    });

    it("should throw Error when client is not initialized", async () => {
      const gasPrice = new GasPrice(null);

      await expect(gasPrice.getGasPrice()).rejects.toThrow(
        "Public client not initialized"
      );
    });
  });
});
