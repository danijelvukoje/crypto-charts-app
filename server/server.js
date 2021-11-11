import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/api/:coinId/:startDate/:endDate', (req, res) => {
  const coinId = req.params.coinId;
  const startDate = req.params.startDate;
  const endDate = req.params.endDate;
  console.log(`called with ${coinId}, ${startDate}, ${endDate}`);
  fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}/historical?start=${startDate}&end=${endDate}&interval=1d&limit=5000`)
    .then(res => res.json())
    .then(data => res.send(data))
    .catch(e => console.log(e));
});

app.use('*', (_req, res) => {
  res.status(404).send('404 Page not found.');
});

const port = '9000';

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
