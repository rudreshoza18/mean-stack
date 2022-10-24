const mongoose = require("mongoose");
mongoose
  .connect(
    ""
  )
  .then(() => {
    console.info("Database Connected.");
  })
  .catch(() => {
    console.error("Connection failed");
  });
