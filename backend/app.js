const express = require("express");
const mongoose = require("mongoose");
const { usersRouter } = require("./routes/users");
const { cardsRouter } = require("./routes/cards");
const  AppError = require("./errors/AppError");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");
const { celebrate } = require('celebrate');
const errorHandler = require('./middlewares/errorHandler')
const { errors } = require('celebrate');
const { validateUserBody } = require("./middlewares/validation");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const cors = require('cors');
const path = require ("path");

const app = express();

async function main() {
  await mongoose.connect("mongodb://localhost:27017/aroundb");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main()
  .then(() => console.log("connected to mongo"))
  .catch((err) => console.log(`error connecting: ${err}`));

app.use(express.json());


app.use(requestLogger);

app.use(cors({
  origin: [
    'http://localhost:4173',
    'http://localhost:3000',
    'https://fotolog.crabdance.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('O servidor travará agora');
  }, 0);
});

app.post('/signin', login);
app.post('/signup', celebrate({
  body: validateUserBody
}), createUser);

app.use(auth);

app.use("/api/users", usersRouter);
app.use("/api/cards", cardsRouter);

app.use(errorLogger);

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }
  next(err);
})

app.use(errorHandler);
app.use(errors())

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
