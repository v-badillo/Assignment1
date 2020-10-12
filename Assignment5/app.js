const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require("./controllers/error");
const User = require('./models/user')

const MONGODB_URI =
  'mongodb+srv://user_vb:YYoreEBNieHerjZD@cluster0.wpmmy.mongodb.net/shop?retryWrites=true&w=majority';

const app = express(); // when using express, always check the order of the middlewares

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

app.set("view engine", "ejs"); //setting engine (compiling dynamic template)
app.set("views", "views"); //where to find the template (this is the default settings if you are using views)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'test',
          email: 'test@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
