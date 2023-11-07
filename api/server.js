// build your server here and require it from index.js
const express = require('express');
require('dotenv').config();
const tasks = require('./task/router');
const resources = require('./resource/router');
const projects = require('./project/router');

const server = express()
server.use(express.json());

const port = process.env.PORT | 9000;

server.use('/api/tasks', tasks);
server.use('/api/resources', resources);
server.use('/api/projects', projects);

server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});

module.exports = server;