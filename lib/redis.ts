// const { createClient } = require('redis');
// require('dotenv').config();

// const client = createClient({
//   username: process.env.REDIS_USER,
//   password: process.env.REDIS_PW,
//   socket: {
//     host: process.env.REDIS_HOST,
//     port: process.env.REDIS_PORT,
//     tls: true, 
//   },
// });

// client.on('error', err => console.log(err));

// if (!client.isOpen) {
//   client.connect();
//   console.log(process.env.REDIS_HOST);
//   console.log(process.env.NODE_ENV);
//   console.log('connected to redis');
// }

// module.exports = client;
