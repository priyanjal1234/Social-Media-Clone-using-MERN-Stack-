const postModel = require("../models/post-model");
const userModel = require("../models/user-model");

module.exports.createPostController = async function (req, res) {
  let { caption } = req.body;
  try {
    let user = await userModel.findOne({ email: req.user.email });

    const images = req.files["images"]
      ? req.files["images"].map((file) => file.path)
      : [];

    let post = await postModel.create({
      caption,
      user,
      images,
    });
    if (post) {
      user.posts.push(post._id);
      await user.save();
    }
    res.status(201).json({ message: "Post Created Successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.getAllPostsController = async function (req, res) {
  try {
    let allPosts = await postModel.find().populate("user");
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.likePostController = async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    let posttobeliked = await postModel.findOne({ _id: req.params.id });
    if (!posttobeliked) {
      return res.status(404).json({ errorMessage: "Post not found" });
    }
    if (!posttobeliked.likes.includes(user._id)) {
      posttobeliked.likes.push(user._id);
      await posttobeliked.save();
      return res.status(200).json({ message: "Post is liked" });
    } else {
      posttobeliked.likes = posttobeliked.likes.filter(
        (id) => id.toString() !== user._id.toString()
      );
      await posttobeliked.save();
      return res.status(200).json({ message: "Post is disliked" });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.deletePostController = async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    let posttobedeleted = await postModel.findOne({ _id: req.params.id });

    if (!posttobedeleted) {
      return res.status(404).json({ message: "Post not found" });
    }
    user.posts = user.posts.filter(
      (id) => id.toString() !== posttobedeleted._id.toString()
    );
    await commentModel.deleteMany({post: posttobedeleted._id})
    
    await user.save();
    let deletedPost = await postModel.findOneAndDelete({
      _id: req.params.id,
      user: user._id,
    });
    res.status(200).json({ message: "Post Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.getSpecificPostController = async function (req, res) {
  try {
    let post = await postModel.findOne({ _id: req.params.id });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
