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

//const projectRoutes = require('./routes/project.routes');
//const authRoutes = require('./routes/auth.routes');

// Rotas Publicas
//app.use('/auth', authRoutes);

// Middleware de autenticação

const authMiddleware = require('./middlewares/auth.middleware');

app.use(authMiddleware);


// Rotas Privadas que precisam de jwt



// exportar o meu app

module.exports = app;