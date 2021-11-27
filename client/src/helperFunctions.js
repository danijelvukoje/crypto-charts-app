const getLabels = (data, interval) => {
  if (interval.includes('m')) {
    return data.map(obj => obj.timestamp.substring(11, 16));
  }
  if (interval.includes('h')) {
    return data.map(obj => `${obj.timestamp.substring(0, 10)} ${obj.timestamp.substring(11, 16)}`);
  }
  return data.map(obj => obj.timestamp.substring(0, 10));
};

const parseData = (data, coinId, startDate, endDate, interval) => ({
  id: Date.now(),
  data: {
    labels: getLabels(data, interval),
    datasets: [{
      label: coinId,
      lineTension: 0.2,
      fill: true,
      data: data.map(obj => obj.price),
      pointRadius: 1.5,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    }],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        grid: {
          display: false,
        },
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price in USD',
          position: 'top',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  },
  info: {
    coinId,
    startDate,
    endDate,
    interval,
  },
});

export default parseData;
