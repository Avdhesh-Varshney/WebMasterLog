import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [search, setSearch] = useState('');
  const [crypto, setCrypto] = useState([]);

  useEffect(() => {
    Axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'eur',
        order: 'market_cap_desc',
        per_page: 200,
        page: 1,
        sparkLine: false,
      },
    })
      .then((res) => {
        setCrypto(res.data);
      })
  }, []);
  return (
    <div className="app">
      <h1 className="title">Cryptocurrency Finder App</h1>
      <input
        type="text"
        placeholder="Enter Small Letters..."
        onChange={(e) => setSearch(e.target.value.toLowerCase())} 
      />
      <table>
        <thead>
          <tr>
            <th className='th'>Rank</th>
            <th className='th'>Name</th>
            <th className='th'>Symbol</th>
            <th className='th'>Market Cap</th>
            <th className='th'>Price</th>
            <th className='th'>Available Supply</th>
          </tr>
        </thead>
        <tbody>
          {crypto
            .filter((val) => val.name.toLowerCase().includes(search))
            .map((val, id) => (
              <tr key={id} className="id">
                <td className="rank">{id+1}</td>
                <td className="logo">
                  <img src={val.image} alt="logo" width="30px" />
                  <p>{val.name}</p>
                </td>
                <td className="Symbol">{val.symbol.toUpperCase()}</td>
                <td>€ {val.market_cap.toLocaleString()}</td>
                <td>€ {val.current_price.toLocaleString()}</td>
                <td>{val.circulating_supply.toLocaleString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
