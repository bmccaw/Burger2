require('dotenv').config()
var express = require("express");
var methodOverride = require('method-override');
var path = require('path');

const PORT = process.env.PORT || 8080;

const app = express();

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Allow the use of PUT and POST directly in the HTML
app.use(methodOverride('_method'));

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Requiring our models for syncing
const db = require("./models");

// Serve static content for the app from the "public" directory in the application directory.
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, '/public')));

require('./routes/api-routes')(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});