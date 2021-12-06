//seting up Mongoose and Express to connect when we start the app
const mongoose = require('mongoose');
const express = require('express');

//defining PORT variable
const app = express();
const PORT = process.env.PORT || 3001;

//Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connecting routes to server
app.use(require('./routes'));

//middleware telling mongoose which database we want to connect with
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-api-shell', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`😁👍 Connected to localhost ${PORT}, BRUH!!!`));