const controller = require("../Controllers/controller");
const express = require("express");
const app = express();
const multer = require("multer");
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};
const storage = multer.diskStorage({
  destination: (req, fil, cb) => {
    const isValid = MIME_TYPE_MAP[fil.mimetype];
    let error = new Error("Invalid MIME Type");
    if (isValid) {
      error = null;
    }
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    //     cb(null, name + "-" + Date.now() + ".", ext);
    cb(null, name);
  },
});
app.get("/posts", controller.getPosts);
app.post("/posts", multer({ storage }).single("image"), controller.createPost);
app.delete("/posts/:id", controller.deletePost);
app.put("/post/:id", controller.updatePost);
app.get("/posts/:id", controller.getSinglePostData);
module.exports = app;
