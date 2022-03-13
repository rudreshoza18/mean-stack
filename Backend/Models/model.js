const Post = require("../Model/post");
const { has } = require("lodash");
exports.getPostsData = async () => {
  try {
    return await Post.find().then((posts)=>{
      console.log(posts);
      return posts
    }).catch((e)=>{
      return e
    });
  } catch (error) {
    return error;
  }
};
exports.createPosts = async (req) => {
  const postData = req.body;
  const url = req.protocol + "://" + req.get("host");
  try {
    const post = new Post({
      title: postData.title,
      content: postData.content,
      image: url + "/images/" + req.file.filename,
    });
    const resData = await post
      .save()
      .then((createdPost) => {
        return  {
          id: createdPost._id,
          title: createdPost.title,
          content: createdPost.content,
          image: createdPost.image,
        };
      })
      .catch((e) => {
        console.error(e.message);
        return e;
      });
    return resData;
  } catch (e) {
    console.error("model err", e.message);
    return e;
  }
};
exports.deletePost = async (id) => {
  try {
    return await Post.deleteOne({ _id: id });
  } catch (e) {
    console.error(e.message);
    return await e;
  }
};

exports.updatePost = async (req, id) => {
  const post = new Post({
    title: req.title,
    content: req.content,
    _id: id,
  });
  try {
    const data = await Post.updateOne({ _id: id }, post)
      .then((updatedPost) => {
        return updatedPost;
      })
      .catch((e) => {
        return e;
      });
    return data;
  } catch (e) {
    return await e;
  }
};
exports.getSinglePostData = async (id) => {
  try {
    const post = Post.findById(id)
      .then((post) => {
        return post;
      })
      .catch((e) => {
        return e;
      });
    return post;
  } catch (error) {
    return error;
  }
};
