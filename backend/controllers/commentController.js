const commentModel = require("../models/comment-model");
const postModel = require("../models/post-model");
const userModel = require("../models/user-model");

module.exports.createCommentController = async function (req, res) {
  let { commentContent, postId } = req.body;
  let post = await postModel.findById(postId);
  try {
    let user = await userModel.findOne({ email: req.user.email });
    let comment = await commentModel.create({
      commentContent,
      user: user._id,
      post: postId,
    });
    post.comments.push(comment._id);
    await post.save();
    res.status(201).json({ message: "Comment Created Successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.readAllCommentsController = async function (req, res) {
  try {
    let post = await postModel.findOne({ _id: req.params.id });
    let comments = await commentModel.find({ post: post._id }).populate("user");
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.deleteCommentController = async function (req, res) {
  try {
    let post = await postModel.findOne({ _id: req.params.postId });
    let commenttobedeleted = await commentModel.findOne({
      _id: req.params.commentId,
    });
    post.comments = post.comments.filter(
      (id) => id.toString() !== commenttobedeleted._id.toString()
    );
    await post.save();
    let deletedComment = await commentModel.findOneAndDelete({
      _id: req.params.commentId,
    });
    res.status(200).json({ message: "Comment Deleted" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
