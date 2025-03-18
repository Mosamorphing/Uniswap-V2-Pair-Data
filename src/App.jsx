import React from 'react'
import { useState } from 'react'
import { Header } from './components/Header'
import { PairInfo } from './components/PairInfo'
import { TokenInfo } from './components/TokenInfo'
import './App.css'

function App () { 
  const [pairAddress, setPairAddress] = useState("");
  const [data, setData] = useState(null);

  const placeholderData = {
    reserves: {
      reserve0: "1000000",
      reserve1: "2000000",
    },
    totalSupply: "5000000",
    token0: {
      address: "0xToken0Address",
      name: "Token 0",
      symbol: "TKN0",
      decimals: "18",
    },
    token1: {
      address: "0xToken1Address",
      name: "Token 1",
      symbol: "TKN1",
      decimals: "18",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just set the placeholder data
    setData(placeholderData);
    setPairAddress(e.target.elements.pairAddress.value);
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <input
          name="pairAddress"
          placeholder="Enter Pair Address"
          required
        />
        <button type="submit">Fetch Data</button>
      </form>

      {pairAddress && <p>Pair Address: {pairAddress}</p>}

      {data && (
        <>
          <PairInfo data={data} />
          <TokenInfo token={data.token0} title="Token 0" />
          <TokenInfo token={data.token1} title="Token 1" />
        </>
      )}
    </div>
  )
}

export default App










// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


