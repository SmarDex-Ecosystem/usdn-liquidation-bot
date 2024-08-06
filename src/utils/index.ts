import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

export async function sleep(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export async function newClient(rpcUrl: string) {
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(rpcUrl),
  });

  return publicClient;
}
