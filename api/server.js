const express = require('express');

const projectRouter = require('./projectRouter');
const actionRouter = require('./actionRouter');


const server = express();
server.use(express.json())
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);


server.get('/', (req, res) => {
  res.send(`<h1>Hello From the API</h1>`)
})


module.exports = server;