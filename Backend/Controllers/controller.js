const models = require("../Models/model");
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
  
  const data = await models.createPosts(req);
  try {
    res.status(200).json({
      status: 200,
      data,
      msg: "Data Fetched Sucessfully",
    });
  } catch (error) {
    res.status(400).json({
      err: e,
      data,
      msg: e.message,
      status: 400,
    });
  }
};
exports.deletePost = async (req, res) => {
  const params = req.params;
  try {
    res.status(200).json({
      data: await models.deletePost(params.id),
      msg: "Post Deleted",
      status: 200,
    });
  } catch (e) {
    res.status(400).json({
      err: e,
      msg: e.message,
      status: 400,
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
