const { Pool } = require("pg");

require("dotenv").config({ path: "./.env" })

const pool = new Pool({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  allowExitOnIdle: true,
});

module.exports = {};
