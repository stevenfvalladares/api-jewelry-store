const { Pool } = require("pg");
const format = require("pg-format");

require("dotenv").config({ path: "./.env" });

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
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

const getJewelryByFilters = async ({
  categoria,
  metal,
  precio_max,
  precio_min
}) => {
  let filters = [];
  const values = [];

  const addFilter = (field, comparator, value) => {
    values.push(value);
    const { length } = filters;
    filters.push(`${field} ${comparator} $${length + 1}`);
  };

  if (categoria) addFilter("categoria", "=", categoria);
  if (metal) addFilter("metal", "=", metal);
  if (precio_max) addFilter("precio", "<=", precio_max);
  if (precio_min) addFilter("precio", ">=", precio_min);

  let sqlQuery = "SELECT * FROM inventario";
  if (filters.length > 0) {
    filters = filters.join(" AND ");
    sqlQuery += ` WHERE ${filters}`;
  }

  const { rows: joyas } = await pool.query(sqlQuery, values)
  return joyas
};

module.exports = { getJewelry, getJewelryByFilters };
