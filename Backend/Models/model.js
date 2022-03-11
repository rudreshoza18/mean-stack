const Post = require("../Model/post");
exports.getPostsData = async () => {
  try {
    return await Post.find();
  } catch (error) {
    return error;
  }
};
exports.createPosts = async (req) => {
  console.log({ req });
  try {
    const post = new Post({
      title: req.title,
      content: req.content,
    });
    console.info(post);
    await post.save().then((createdPost)=>{
      createdPost
    });
    return post;
  } catch (e) {
    console.error("model err", e.message);
    return e.message;
  }
};
exports.deletePost = async (id) => {
  console.log("model", id);
  try {
    return await Post.deleteOne({ _id: id });
  } catch (e) {
    console.error(e.message);
    return await e.message;
  }
};

exports.updatePost = async (req, id) => {
  const post = new Post({
    title: req.title,
    content: req.content,
    _id: id,
  });
  try {
    const data = await Post.updateOne({ _id: id }, post).then((updatedPost)=>{
      return updatedPost
    }).catch((e)=>{
      return e
    });
    return data;
  } catch (e) {
    return await e;
  }
};
exports.getSinglePostData= async (id)=>{
  try{
    const post = Post.findById(id).then((post)=>{
      return post
    }).catch((e)=>{
      return e
    })
    return post
  }catch(error){
    return error
  }
}