import React, { useState } from 'react';
import { Header } from './components/Header';
import { PairInfo } from './components/PairInfo';
import { TokenInfo } from './components/TokenInfo';
import { usePairData } from './hooks/usePairData';
import './App.css';

function App() {
  const [pairAddress, setPairAddress] = useState("");
  const { data, loading, error } = usePairData(pairAddress);

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredAddress = e.target.elements.pairAddress.value.trim();
    if (!enteredAddress) return alert("Enter a valid Uniswap V2 Pair address");
    setPairAddress(enteredAddress);
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <input name="pairAddress" placeholder="Enter Uniswap V2 Pair Address" required />
        <button type="submit">Fetch Data</button>
      </form>

      {pairAddress && <p>Pair Address: <strong>{pairAddress}</strong></p>}

      {loading && <p>Loading pair data...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {data && (
        <>
          <PairInfo data={data} />
          <TokenInfo token={data.token0} title={`Token 0: ${data.token0.symbol}`} />
          <TokenInfo token={data.token1} title={`Token 1: ${data.token1.symbol}`} />
        </>
      )}
    </div>
  );
}

export default App;
