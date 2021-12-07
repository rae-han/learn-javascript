const express = require('express');
const cors = require('cors');
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();

const port = 3000;

app.use(cors());
app.use(bodyParser.json());

try {
  fs.statSync('./brands.json');
} catch (error) {
  fs.writeFileSync('brands.json', JSON.stringify([{ "id": 1, "name": "time" }]), function(err) {
    if(err) {
      console.log(err, error);
    }
    console.log('파일 생성 완료!')
  });
  console.log('파일 생성 완료!!')
}

const readJSON = filename => {
  return JSON.parse(fs.readFileSync(`./${filename}.json`));
}

app.get('/test', (req, res) => {
  res.send('Hello Test!')
});

app.get('/', (req, res) => {
  const client = path.join(__dirname, '../client/index.html');
  res.sendFile(client);
})

app.get('/brand', function (req, res) {
  const brands = readJSON('brands');
  res.json(brands)
});

app.get('/brand/:id', function (req, res) {
  const { id } = req.params;
  const brands = readJSON('brands');
  const brand = brands.filter(brand => brand.id == id);
  console.log(brand)
  res.json(brand)
});

app.post('/brand', function (req, res) {
  let { name } = req.body;
  const brands = readJSON('brands');
  brands.push({ id: brands[brands.length-1].id+1 || 0, name });
  fs.writeFileSync('./brands.json', JSON.stringify(brands));
  res.json(123);
});

app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});