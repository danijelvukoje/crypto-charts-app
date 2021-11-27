import Chart from './Chart';
import parseData from '../helperFunctions';
import './ChartList.css';

const ChartList = ({ charts, setChartsState }) => {
  const removeChart = (chartId, e) => {
    e.stopPropagation();
    setChartsState(charts.filter(chart => chart.id !== chartId));
  };

  const updateChart = (chartObj, e) => {
    e.stopPropagation();

    const fetchData = async () => {
      const oldChartObj = charts.find(chart => chart.id === chartObj.id);
      const res = await fetch(`http://localhost:9000/api/${chartObj.info.coinId}/${chartObj.info.startDate}/${Date.now()}/${chartObj.info.interval}`);
      const data = await res.json();
      const parsedChartObj = parseData(
        data, chartObj.info.coinId, chartObj.info.startDate, Date.now(), chartObj.info.interval,
      );
      console.log(`refreshed${parsedChartObj}`);
      setChartsState(charts.map(chart => {
        let chartData = {};
        if (chart.id === oldChartObj.id) {
          chartData = chart;
          chartData = parsedChartObj;
          console.log(`data mathed${chartData}`);
          return chartData;
        }
        return chart;
      }));
    };
    fetchData();
  };

  return (
  <>
  <section className="chart-list">
    {charts.map((chart, i) => (
      <Chart key={i} chart={chart} removeChart={removeChart} updateChart={updateChart} />
    ))}
  </section>
  </>
  );
};

export default ChartList;
