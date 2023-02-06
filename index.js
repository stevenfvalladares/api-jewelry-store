const express = require("express");
const app = express();

app.listen(3000, console.log("Server running from port 3000"));

const { getJewelry, getJewelryByFilters } = require("./consultas");

app.get("/joyas", async (req, res) => {
  try {
    const queryStrings = req.query;
    const joyas = await getJewelry(queryStrings);
    res.json(joyas);
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
