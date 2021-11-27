import { Line } from 'react-chartjs-2';
import './Chart.css';

const Chart = ({ chart, removeChart, updateChart }) => {
  console.log(chart);
  console.log(typeof chart.info.endDate);
  const getEndDate = date => {
    if (typeof date === 'string') return date;
    const year = new Date(chart.info.endDate).getFullYear();
    const month = new Date(chart.info.endDate).getMonth() + 1;
    const day = new Date(chart.info.endDate).getDate();
    const parsedDate = `${year}-${month}-${day}`;
    return parsedDate;
  };
  return (
    <article className="chart-content">
      <div className="chart">
        <Line data={chart.data} options={chart.options} />
      </div>
      <div className="chart-info">
        <div className="chart-info__p">
          Last price: {chart.data.datasets[0].data[chart.data.datasets[0].data.length - 1]}$
        </div>
        <div className="chart-info__p">
          Highest price: {chart.data.datasets[0].data.reduce((a, b) => Math.max(a, b))}$
        </div>
        <div className="chart-info__p">
          Lowest price: {chart.data.datasets[0].data.reduce((a, b) => Math.min(a, b))}$
        </div>
        <div className="chart-info__p">
          Start Date: {chart.info.startDate}
        </div>
        <div className="chart-info__p">
          End Date: {getEndDate(chart.info.endDate)}
        </div>
        <div className="chart-info__p">Interval: {chart.info.interval}</div>
      </div>
      <div className="chart-buttons">
        <button className="chart-button--update" onClick={e => updateChart(chart, e)}>Update</button>
        <button className="chart-button--remove" onClick={e => removeChart(chart.id, e)}>Remove</button>
      </div>
    </article>
  );
};

export default Chart;
