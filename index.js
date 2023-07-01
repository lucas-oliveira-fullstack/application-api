const express = require('express');
const db = require('./models/db');
const userRoutes = require('./routes/user_routes');


const index = express();

index.use(express.json());
index.use('/routes', userRoutes);

index.get("/", async (req,res) => {
  res.send("API para cadastro, atualização, listage e remoção de usuários ativa");
});

index.listen(8000, () => {
  console.log("Server started on port 8000: http://localhots:8000");
});
