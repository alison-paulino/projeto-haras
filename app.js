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

<<<<<<< HEAD
// Rotas Públicas
const routerAuth = require('./routes/auth.routes')
=======
// Rotas
const routerAuth = require('./routes/auth.routes');
const routerHorse = require('./routes/horse.routes');

>>>>>>> 2b321e4b86142db3e00d1e4b252077ae318e0ad5
app.use('/auth', routerAuth);
// Middleware de autenticação
const authMiddleware = require('./middlewares/auth.middleware');
app.use(authMiddleware);
app.use('/horse', routerHorse);


// Rotas Privadas (Precisam de jwt)
const harasRouter = require('./routes/haras.routes')
const plansRouter = require('./routes/plans.routes')
app.use( '/haras', harasRouter )
app.use( '/plans', plansRouter )


// exportar app

module.exports = app;