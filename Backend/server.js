const express = require("express");
const path = require('path');
const app = express();
const routes = require("./Routes/routes");
const PORT = process.env.PORT || 3000;
const db = require("./DB/db");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/images',express.static(path.join('images')))
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,Accept,Content-Type,X-Requested-With"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});
app.use("/api", routes);
app.listen(PORT, () => {
  console.log("Server is Running at PORT " + PORT);
});
