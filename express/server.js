const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://192.168.33.10:4200"
};

app.use(cors(corsOptions));

const db = require("./app/models");

const dbURI = process.env.MONGO_URI || db.url; // Use MONGO_URI from environment variable or fallback to db.url

db.mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Inventaire application." });
});
require("./app/routes/serveur.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = { app, server };
