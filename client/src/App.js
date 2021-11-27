import { useState } from 'react';
import Header from './components/Header';
import AddChartForm from './components/AddChartForm';
import ChartList from './components/ChartList';
import './App.css';

function App() {
  const [charts, setCharts] = useState([]);

  const setChartsState = chartObj => {
    setCharts([{ ...chartObj }, ...charts]);
  };

  return (
    <div className="app">
      <Header />
      <AddChartForm setChartsState={setChartsState} />
      <ChartList charts={charts} setChartsState={setCharts}/>
    </div>
  );
}

export default App;
