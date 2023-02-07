const express = require("express");
const moment = require("moment");
const app = express();

app.listen(3000, console.log("Server running from port 3000"));

const { getJewelry, getJewelryByFilters } = require("./consultas");

// midleware

const prepareHATEOAS = (items) => {
  const results = items
    .map((item) => {
      return {
        name: item.nombre,
        href: `/joyas/joya/${item.id}`,
      };
    })
    .slice(0, 4);
  const totalJoyas = items.length;
  let stockTotal = items.reduce(
    (accumulator, current) => accumulator + current.stock,
    0
  );
  const HATEOAS = {
    totalJoyas,
    stockTotal,
    results,
  };
  return HATEOAS;
};

app.get("/joyas", async (req, res) => {
  try {
    const queryStrings = req.query;
    const joyas = await getJewelry(queryStrings);
    const HATEOAS = await prepareHATEOAS(joyas);
    res.json(HATEOAS);
  } catch (err) {
    console.error(err);
    res.send(err.message);
  }
});

app.get("/joyas/filters", async (req, res) => {
  const queryStrings = req.query;
  const joyas = await getJewelryByFilters(queryStrings);
  res.json(joyas);
});

// default route
app.get("*", (req, res) => {
  res.status(404).send(`The requested URL/${req.originalUrl} was not found on this server.`);
});
