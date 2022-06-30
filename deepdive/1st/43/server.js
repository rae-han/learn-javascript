const express = require('express');
const app = express();
const port = 3000;

const brands = [
  { id: 1, name: 'Time' }
];

app.get('/test', (req, res) => {
  res.send('Test')
});

app.get('/brands', function (req, res) {
  res.json(brands);
});

app.post('/', function (req, res) {
  res.send('Got a POST request');
});

app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});