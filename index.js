const express = require('express');
const path = require('path');

const app = express();
const port = 8000;
const basePath = path.join(__dirname, 'templates')
const usersRoutes = require('./routes/user_routes.js')

app.use(express.json());

app.use('/users', usersRoutes)

app.get("/", (req, res) => {
  res.send("API para cadastro, atualização, listagem e remoção de usuário");
})

app.use(function (req, res, next) {
  res.status(404).sendFile(basePath, '/404.html')
})

app.listen(port, () => {
  console.log(`Server started on port ${port}: http://localhost:${port}`);
});
