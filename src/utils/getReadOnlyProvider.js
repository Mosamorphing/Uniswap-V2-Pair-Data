import { JsonRpcProvider } from "ethers";

export const getReadOnlyProvider = () => {
  const RPC_URL = import.meta.env.VITE_INFURA_RPC_URL;

  if (!RPC_URL) {
    throw new Error("❌ RPC URL is missing! Set VITE_INFURA_RPC_URL in your .env file.");
  }

  console.log("✅ Using RPC URL:", RPC_URL); // Debugging
  return new JsonRpcProvider(RPC_URL);
};
