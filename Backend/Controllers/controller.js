const models = require("../Models/model");
exports.getData = (req, res) => {
  try {
    res.status(200).send("try");
  } catch (e) {
    res.status(400).send("data");
  }
};
exports.getPosts = async (req, res) => {
  try {
    const posts = await models.getPostsData(req.body);
    let resData = {
      status: 200,
      posts,
      msg: "Data fetched",
      total: posts.length,
    };
    res.status(200).json(resData);
  } catch (error) {
    let resData = {
      status: 400,
      data: [],
      msg: error,
    };
    res.status(400).json(resData);
  }
};
exports.createPost = async (req, res) => {
  try {
    res.status(200).json({
      status: 200,
      data: await models.createPosts(req.body),
    });
  } catch (error) {
    res.status(400).json({
      err: e,
      data: [],
      msg: e.message,
    });
  }
};
exports.deletePost = async (req, res) => {
  const params = req.params;
  console.log({ params });
  try {
    res.status(200).json({
      data: await models.deletePost(params.id),
      msg: "Post Deleted",
    });
  } catch (e) {
    res.status(400).json({
      err: e,
      msg: e.message,
    });
  }
};
exports.updatePost = async (req, res) => {
  const params = req.params.id;
  const data = await models.updatePost(req.body, params);
  try {
    res.status(200).json({
      status: 200,
      msg: "Data Fetched Successfully",
      data,
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      msg: e.message,
      data,
    });
  }
};
exports.getSinglePostData = async (req, res) => {
  const data = await models.getSinglePostData(req.params.id);
  try {
    res.status(200).json({
      status: 200,
      msg: "Data Fetched Successfully",
      data,
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      msg: e.message,
      data,
    });
  }
};
