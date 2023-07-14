require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const authRoute = require('./routes/auth');
const cookieSession = require('cookie-session');
const passportStrategy = require('./passport');
const app = express();
const UserRouter = require('./routes/user');
const conncetToDb = require('./database/db');
const task4 = require('./Tasks/Task4');
const task5 = require('./Tasks/Task5');
conncetToDb();

app.use(
  cookieSession({
    name: 'session',
    keys: ['cyberwolve'],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

app.use('/auth', authRoute);
app.use('/user', UserRouter);

task4();
// task5();

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
