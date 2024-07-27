const express = require('express');
const dotenv = require('dotenv').config();
const userRoutes = require('./routes/users.routes')
const connect = require('../DB/database');
const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
connect();

app.use('/api/',userRoutes)
app.listen(port,()=>console.log(`Servidor rodando na porta localhost:${port}`))