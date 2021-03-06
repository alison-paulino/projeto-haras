require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Connect DB
require('./config/db.config');

const app = express();
app.use(cors());

// Middlewares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// Rotas
const routerAuth = require('./routes/auth.routes');
const routerHorse = require('./routes/horse.routes');
const routerSponsor = require('./routes/sponsor.routes')
const routerRefPlanHorse = require('./routes/refPlanHorse.routes')
const routerPlan = require('./routes/plans.routes')

// Rotas

app.use('/auth', routerAuth);
app.use('/sponsor', routerSponsor);
app.use('/support', routerRefPlanHorse);
app.use('/plans', routerPlan);


// Middleware de autenticação
const authMiddleware = require('./middlewares/auth.middleware');
app.use(authMiddleware);
app.use('/horse', routerHorse);

// Rotas Privadas (Precisam de jwt)
const harasRouter = require('./routes/haras.routes')
const plansRouter = require('./routes/plans.routes')
const routerMessage = require('./routes/message.routes')

app.use('/message',routerMessage);
app.use( '/haras', harasRouter )

// exportar app

module.exports = app;