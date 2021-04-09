require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Connect DB
require('./config/db.config');

const app = express();

// Middlewares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Rotas
const routerAuth = require('./routes/auth.routes');
const routerHorse = require('./routes/horse.routes');

app.use('/auth', routerAuth);
// Middleware de autenticação
const authMiddleware = require('./middlewares/auth.middleware');
app.use(authMiddleware);
app.use('/horse', routerHorse);

// exportar app

module.exports = app;