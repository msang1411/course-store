require("dotenv").config();
const redis = require("redis");
const client = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
});

// const connect = async () =>{
//   client.connect();
// }

module.exports = client;
