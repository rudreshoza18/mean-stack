const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://roza:XHOsqIyBcgzWXxCa@cluster0.f3fee.mongodb.net/postDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    console.info("Database Connected.");
  })
  .catch(() => {
    console.error("Connection failed");
  });
