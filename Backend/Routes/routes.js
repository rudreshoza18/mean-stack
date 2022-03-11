const controller = require("../Controllers/controller");
const express = require("express");
const app = express();
app.get("/", controller.getData);
app.get("/posts", controller.getPosts);
app.post("/posts", controller.createPost);
app.delete("/posts/:id", controller.deletePost);
app.put("/post/:id", controller.updatePost);
app.get("/posts/:id", controller.getSinglePostData);
module.exports = app;
