const express = require('express');
const userRouter = require('./routes/user.routes');
const config = require('config');

const HOST = config.get('serverHost');
const PORT = config.get('serverPort');

const app = express();

app.use(express.static(`${__dirname}/data`));
app.use(express.json());
app.use('/api/users', userRouter);

app.listen(PORT, HOST, () => {
  console.log(`server started on ${PORT}`);
});
