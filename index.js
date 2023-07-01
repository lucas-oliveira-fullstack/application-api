const express = require('express');

express();

const  app = express();

app.get("/", async (req, res) => {
    res.send("Página inicial")
});

app.listen(8081, () => {
    console.log("Servidor iniciado na porta 8080: http://localhotst:8081");
});