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

// Rotas Públicas
const routerAuth = require('./routes/auth.routes')
app.use('/auth', routerAuth);

// Middleware de autenticação

const authMiddleware = require('./middlewares/auth.middleware');
app.use(authMiddleware);


// Rotas Privadas (Precisam de jwt)
const harasRouter = require('./routes/haras.routes')
const plansRouter = require('./routes/plans.routes')
app.use( '/haras', harasRouter )
app.use( '/plans', plansRouter )


// exportar app

module.exports = app;