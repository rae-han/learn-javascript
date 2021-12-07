const express = require('express');
const cors = require('cors');
const app = express();
const path = require("path");

const port = 3000

app.use(cors());

const brands = [
  { id: 1, name: 'time' }
]

app.get('/test', (req, res) => {
  res.send('Hello Test!')
});

app.get('/', (req, res) => {
  const client = path.join(__dirname, '../client/index.html');
  console.log(client)
  res.sendFile(client);
})

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