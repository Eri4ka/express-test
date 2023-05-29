const express = require('express');
const fs = require('fs');

const HOST = '127.0.0.1';
const PORT = 3001;

const app = express();

app.use(express.static(`${__dirname}/data`));
app.use(express.json());

const dataFile = './data/users.json';

app.get('/api/users', (req, res) => {
  const data = fs.readFileSync(dataFile, 'utf8');
  const users = JSON.parse(data);
  res.json(users);
});

app.get('/api/users/:userId', (req, res) => {
  const { userId } = req.params;

  const data = fs.readFileSync(dataFile, 'utf8');
  const parsedData = JSON.parse(data);
  const user = parsedData.find((item) => item.id === +userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json('Not found');
  }
});

app.post('/api/users', (req, res) => {
  const requestBody = req.body;

  if (Object.keys(requestBody).length === 0) {
    return res.status(404).json('Empty data');
  }

  const data = fs.readFileSync(dataFile, 'utf8');
  const parsedData = JSON.parse(data);

  const highestId = Math.max(...parsedData.map((item) => item.id));
  const newUser = { id: highestId + 1, ...requestBody };
  parsedData.push(newUser);

  const stringifiedData = JSON.stringify(parsedData);
  fs.writeFileSync(dataFile, stringifiedData);
  res.json(newUser);
});

app.delete('/api/users/:userId', (req, res) => {
  const { userId } = req.params;

  const data = fs.readFileSync(dataFile, 'utf8');
  const parsedData = JSON.parse(data);

  const newData = parsedData.filter((item) => item.id !== +userId);

  if (parsedData.length === newData.length) {
    return res.status(404).json({ status: 'error', message: 'user not found' });
  }

  const stringifiedData = JSON.stringify(newData);
  fs.writeFileSync(dataFile, stringifiedData);
  res.json({ status: 'success', id: userId });
});

app.put('/api/users', (req, res) => {
  const requestBody = req.body;

  if (Object.keys(requestBody).length === 0) {
    return res.status(404).json({ status: 'error', message: 'empty data' });
  }

  if (!requestBody.id) {
    return res.status(404).json({ status: 'error', message: 'id is required' });
  }

  const data = fs.readFileSync(dataFile, 'utf8');
  const parsedData = JSON.parse(data);

  const user = parsedData.filter((item) => item.id === requestBody.id)[0];

  if (!user) {
    return res.status(404).json({ status: 'error', message: 'user not found' });
  }

  const newData = parsedData.map((item) =>
    item.id === requestBody.id ? requestBody : item
  );
  const stringifiedData = JSON.stringify(newData);
  fs.writeFileSync(dataFile, stringifiedData);
  res.json({ status: 'success', id: requestBody.id });
});

app.listen(PORT, HOST, () => {
  console.log(`server started on ${PORT}`);
});
