import React from 'react'

export const TokenInfo = ({ token, title }) => { 
    if (!token) return null;
  return (
    <div>
    <h2>{title}</h2>
    <p>Address: {token.address}</p>
    <p>Name: {token.name}</p>
    <p>Symbol: {token.symbol}</p>
    <p>Decimals: {token.decimals}</p>
    </div>
  )
}