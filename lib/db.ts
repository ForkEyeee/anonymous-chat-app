const { createClient } = require('redis');
require('dotenv').config();

const client = createClient({
  password: process.env.REDIS_PW,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

client.on('error', err => console.log(err));

if (!client.isOpen) {
  client.connect();
  console.log(process.env.REDIS_HOST);
  console.log('connected to redis');
}

module.exports = client;
