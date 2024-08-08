import { PublicClient } from "viem";
import { describe, expect, it, vi } from "vitest";
import UsdnProtocolContract from "./Contract.ts";

// Mocking viem and PublicClient
vi.mock("viem", () => {
  const readContract = vi.fn();
  const multicall = vi.fn();
  return {
    PublicClient: vi.fn(() => ({
      readContract,
      multicall,
    })),
  };
});

// Test setup
const mockContractAddress = "0x1234567890abcdef1234567890abcdef12345678";
const mockPublicClient = new PublicClient();
const mockReadContract = vi.spyOn(mockPublicClient, "readContract");
const mockMulticall = vi.spyOn(mockPublicClient, "multicall");

describe("UsdnProtocolContract", () => {
  describe("getHighestPopulatedTick", () => {
    it("should return the highest populated tick", async () => {
      // Mocking the readContract method of the PublicClient instance
      const expectedTick = 42n;
      mockReadContract.mockResolvedValue(expectedTick);

      const contract = new UsdnProtocolContract(
        mockPublicClient,
        mockContractAddress
      );
      const result = await contract.getHighestPopulatedTick();
      expect(result).toEqual(expectedTick);
    });

    it("should throw an error when the contract call fails", async () => {
      // Mocking the readContract method to throw an error
      mockReadContract.mockRejectedValue(new Error("Contract call failed"));

      const contract = new UsdnProtocolContract(
        mockPublicClient,
        mockContractAddress
      );

      await expect(contract.getHighestPopulatedTick()).rejects.toThrow(
        "Error while executing getHighestPopulatedTick"
      );
    });
  });

  describe("multicall", () => {
    it("should return results from multicall", async () => {
      // Mocking the multicall method of the PublicClient instance
      const expectedResults = [
        {
          functionName: "getHighestPopulatedTick",
          result: 42n,
          status: "success",
        },
      ];
      mockMulticall.mockResolvedValue(expectedResults);

      const contract = new UsdnProtocolContract(
        mockPublicClient,
        mockContractAddress
      );
      const result = await contract.multicall();
      expect(result).toEqual(expectedResults);
    });

    it("should handle errors correctly when multicall fails", async () => {
      // Mocking the multicall method to throw an error
      mockMulticall.mockRejectedValue(new Error("Multicall failed"));

      const contract = new UsdnProtocolContract(
        mockPublicClient,
        mockContractAddress
      );

      // Expecting the result to be an array with an error object
      const result = await contract.multicall();
      expect(result).toEqual([
        { error: new Error("Multicall failed"), status: "failure" },
      ]);
    });
  });
});
