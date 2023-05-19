const express = require("express");
const cors = require("cors");
const app = express();

require('dotenv').config();

app.use(cors());

app.use(express.json());

//DB connection

const conn = require("./db/conn");

conn();

//Routes
const routes = require("./routes/router");

app.use("/api", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() { 
    console.log("Servidor Online!!");
});

