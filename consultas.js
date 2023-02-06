const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "steven",
  password: "22038367",
  database: "joyas",
  port: 5432,
  allowExitOnIdle: true,
});

module.exports = {};
