// Uniswap V2 Pair ABI (simplified)
export const pairAbi = [
    "function token0() view returns (address)",
    "function token1() view returns (address)",
    "function getReserves() view returns (uint112, uint112, uint32)",
    "function totalSupply() view returns (uint256)",
  ];
  
  // ERC20 Token ABI (simplified)
  export const tokenAbi = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
  ];