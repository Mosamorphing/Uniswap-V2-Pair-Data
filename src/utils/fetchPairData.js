import { Contract, Interface } from "ethers";
import { getReadOnlyProvider } from "../utils/getReadOnlyProvider";
import PAIR_ABI from "../ABI/pairAbi.json";
import TOKEN_ABI from "../ABI/tokenAbi.json";
import MULTICALL_ABI from "../ABI/multicall2.json";

const MULTICALL_ADDRESS = "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696"; // Mainnet Multicall

export const fetchPairData = async (pairAddress) => {
  console.log("🔍 Fetching data for Pair Address:", pairAddress);
  if (!pairAddress) throw new Error("❌ Pair address is required!");

  const provider = getReadOnlyProvider();
  const multicall = new Contract(MULTICALL_ADDRESS, MULTICALL_ABI, provider);

  const pairInterface = new Interface(PAIR_ABI);
  const tokenInterface = new Interface(TOKEN_ABI);

  try {
    // Calls for pair contract
    const pairCalls = [
      { target: pairAddress, callData: pairInterface.encodeFunctionData("token0", []) },
      { target: pairAddress, callData: pairInterface.encodeFunctionData("token1", []) },
      { target: pairAddress, callData: pairInterface.encodeFunctionData("getReserves", []) },
      { target: pairAddress, callData: pairInterface.encodeFunctionData("totalSupply", []) }
    ];

    const pairResults = await multicall.aggregate(pairCalls);
    if (!pairResults || pairResults.length !== 4) throw new Error("❌ Failed to fetch pair data");

    // Decode pair contract results
    const token0 = pairInterface.decodeFunctionResult("token0", pairResults[0])[0];
    const token1 = pairInterface.decodeFunctionResult("token1", pairResults[1])[0];
    const reserves = pairInterface.decodeFunctionResult("getReserves", pairResults[2]);
    const totalSupply = pairInterface.decodeFunctionResult("totalSupply", pairResults[3])[0];

    // Calls for token contracts
    const tokenCalls = [
      { target: token0, callData: tokenInterface.encodeFunctionData("name", []) },
      { target: token0, callData: tokenInterface.encodeFunctionData("symbol", []) },
      { target: token0, callData: tokenInterface.encodeFunctionData("decimals", []) },
      { target: token1, callData: tokenInterface.encodeFunctionData("name", []) },
      { target: token1, callData: tokenInterface.encodeFunctionData("symbol", []) },
      { target: token1, callData: tokenInterface.encodeFunctionData("decimals", []) }
    ];

    const tokenResults = await multicall.aggregate(tokenCalls);
    if (!tokenResults || tokenResults.length !== 6) throw new Error("❌ Failed to fetch token data");

    // Decode token contract results
    const token0Name = tokenInterface.decodeFunctionResult("name", tokenResults[0])[0];
    const token0Symbol = tokenInterface.decodeFunctionResult("symbol", tokenResults[1])[0];
    const token0Decimals = tokenInterface.decodeFunctionResult("decimals", tokenResults[2])[0];
    const token1Name = tokenInterface.decodeFunctionResult("name", tokenResults[3])[0];
    const token1Symbol = tokenInterface.decodeFunctionResult("symbol", tokenResults[4])[0];
    const token1Decimals = tokenInterface.decodeFunctionResult("decimals", tokenResults[5])[0];

    return {
      reserves: {
        reserve0: reserves[0].toString(),
        reserve1: reserves[1].toString(),
        blockTimestampLast: reserves[2].toString(),
      },
      totalSupply: totalSupply.toString(),
      token0: {
        address: token0,
        name: token0Name,
        symbol: token0Symbol,
        decimals: token0Decimals.toString(),
      },
      token1: {
        address: token1,
        name: token1Name,
        symbol: token1Symbol,
        decimals: token1Decimals.toString(),
      },
    };
  } catch (error) {
    console.error("❌ Error fetching Uniswap V2 pair data:", error);
    throw new Error("❌ Failed to fetch Uniswap V2 pair data. Check contract address or network.");
  }
};
