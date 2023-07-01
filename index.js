const express = require('express');
const index = express();

const db = require('./models/db');

index.get("/", async (req,res) => {
  res.send("Server started!");
});

index.listen(8000, () => {
  console.log("Server started on port 8000: http://localhots:8000");
});
