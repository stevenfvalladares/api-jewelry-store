const { Pool } = require("pg");
const format = require("pg-format");

require("dotenv").config({ path: "./.env" });

const pool = new Pool({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  allowExitOnIdle: true,
});

const getJewelry = async ({
  limits = "all",
  order_by = "id_ASC",
  page = 1,
}) => {
  if (page <= 0) {
    throw new Error("Page number cannot be equal to 0");
  }

  const offset = (page - 1) * limits;
  const [field, address] = order_by.split("_");

  if (!field || !address) {
    throw new Error("ORDER BY incorrectly declared!");
  }

  const formattedQuery = format(
    "SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s",
    field,
    address,
    limits,
    offset
  );

  const { rows: joyas } = await pool.query(formattedQuery);
  return joyas;
};

module.exports = { getJewelry };
