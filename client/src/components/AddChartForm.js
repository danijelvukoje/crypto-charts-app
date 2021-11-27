import { useState, useRef } from 'react';
import './AddChartForm.css';
import parseData from '../helperFunctions';

const AddChartForm = ({ setChartsState }) => {
  const [coinId, setCoinId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [interval, setIntervalState] = useState('');
  const coinIdInputRef = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    if (coinId === '' || startDate === '' || endDate === '' || interval === '') {
      return;
    }
    const fetchData = async () => {
      const res = await fetch(`http://localhost:9000/api/${coinId}/${startDate}/${endDate}/${interval}`);
      const data = await res.json();
      const chartObj = parseData(data, coinId, startDate, endDate, interval);
      setChartsState(chartObj);
    };
    fetchData();

    setCoinId('');
    setIntervalState('');
    coinIdInputRef.current.focus();
  };

  const handleInputChange = e => {
    switch (e.target.name) {
      case 'coinId':
        setCoinId(e.target.value);
        break;
      case 'startDate':
        setStartDate(e.target.value);
        break;
      case 'endDate':
        setEndDate(e.target.value);
        break;
      case 'interval':
        setIntervalState(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <section className="create-chart">
      <form className="create-chart" autoComplete="off" onSubmit={handleSubmit}>
        <fieldset className="create-fieldset">
          <legend className="create-fieldset__legend">Create New Chart</legend>
          <label className="create-fieldset__label" htmlFor="coinId">Coin</label>
          <select ref={coinIdInputRef} id="coinId" className="create-fieldset__input" type="text" name="coinId" autoFocus value={coinId} onChange={handleInputChange}>
            <option value="select-coin" >Select Coin</option>
            <option value="btc-bitcoin" >BTC - Bitcoin</option>
            <option value="eth-ethereum">ETH - Ethereum</option>
            <option value="bnb-binance-coin">BNB - Binance Coin</option>
            <option value="ada-cardano">ADA - Cardano</option>
            <option value="sol-solana">SOL - Solana</option>
            <option value="xrp-xrp">XRP - Xrp</option>
            <option value="dot-polkadot">DOT - Polkadot</option>
            <option value="shib-shiba-inu">SHIB - Shiba Inu</option>
            <option value="doge-dogecoin">Doge - Dogecoin</option>
          </select>
          <label className="create-fieldset__label" htmlFor="startDate">Start Date:</label>
          <input id="startDate" className="create-fieldset__input" type="date" name="startDate" value={startDate} onChange={handleInputChange}/>
          <label className="create-fieldset__label" htmlFor="endDate">End Date:</label>
          <input id="endDate" className="create-fieldset__input" type="date" name="endDate" value={endDate} onChange={handleInputChange}/>
          <label className="create-fieldset__label" htmlFor="interval">Interval</label>
          <select id="interval" className="create-fieldset__input" type="text" name="interval" value={interval} onChange={handleInputChange}>
            <option value="select-interval" >Select Interval</option>
            <option value="5m" >5 min</option>
            <option value="30m" >30 min</option>
            <option value="1h">1 h</option>
            <option value="6h">6 h</option>
            <option value="12h">12 h</option>
            <option value="1d">1 day</option>
            <option value="7d">1 week</option>
            <option value="30d">1 month</option>
          </select>
          <input className="create-fieldset__button" type="submit" value="Add chart"/>
        </fieldset>
      </form>
    </section>
  );
};

export default AddChartForm;
