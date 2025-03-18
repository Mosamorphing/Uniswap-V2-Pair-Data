import React from 'react'

export const PairInfo = ({ data }) => {
    if (!data) return null;
  return (
    <div>
    <h2>Pair Information</h2>
    <p>Reserve 0: {data.reserves.reserve0}</p>
    <p>Reserve 1: {data.reserves.reserve1}</p>
    <p>Total Supply: {data.totalSupply}</p>
    </div>
  )
}
