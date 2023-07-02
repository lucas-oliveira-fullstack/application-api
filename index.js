const express = require('express');
const db = require('./models/db');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8000;

app.use(express.json());

// Records all routes present in the directory 'routes'
const routesDirectory = path.join(__dirname, 'routes');
const routeFiles = fs.readdirSync(routesDirectory);

routeFiles.forEach((file) => {
  const routePath = path.join(routesDirectory, file);
  const route = require(routePath);
  const routeName = file.split('.')[0]; // Assumede that the file name is the name of the route (without extension)

  app.use(`/${routeName}`, route);
});

app.get("/", (req, res) => {
  res.send("API para cadastro, atualização, listagem e remoção de usuário");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}: http://localhost:${port}`);
});
