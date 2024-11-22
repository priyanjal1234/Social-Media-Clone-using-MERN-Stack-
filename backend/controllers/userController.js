const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  generateVerificationCode,
} = require("../utils/generateVerificationCode");
const sendVerificationEmail = require("../config/mailer");
const crypto = require("crypto");

module.exports.registerController = async function (req, res) {
  let { name, username, email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (user)
      return res.status(409).json({ message: "You are already registered" });
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    let verificationCode = generateVerificationCode();
    user = await userModel.create({
      name,
      username,
      email,
      password: hash,
      verificationCode,
    });
    await sendVerificationEmail(email, verificationCode);

    res
      .status(201)
      .json({ message: "Registration Successful. Verification email sent." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.verifyCodeController = async function (req, res) {
  let { email, code } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.verificationCode !== code)
      return res.status(400).json({ message: "Invalid Verification Code" });
    user.verified = true;
    user.verificationCode = null;
    await user.save();
    let token = jwt.sign(
      { name: user.name, username: user.username, email },
      process.env.JWT_KEY
    );
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });
    res.status(200).json({ message: "Email Verified Successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.loginController = async function (req, res) {
  let { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = jwt.sign(
          { email, name: user.name, username: user.username },
          process.env.JWT_KEY
        );
        res.cookie("token", token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "none",
        });
        return res.status(200).json({ message: "You are logged in" });
      } else {
        return res.status(401).json({ message: "Invalid Password" });
      }
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.logoutController = function (req, res) {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "You are logged out" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.getUserProfileController = async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.updateUserProfileController = async function (req, res) {
  let { name, username, bio } = req.body;
  let user = await userModel.findOne({ email: req.user.email });
  try {
    let updatedUser;
    if (req.file) {
      updatedUser = await userModel.findOneAndUpdate(
        { email: req.user.email },
        {
          name: name || user.name,
          username: username || user.username,
          bio: bio === "" ? "" : bio,
          profilePicture: req.file.path,
        },
        { new: true }
      );
    } else {
      updatedUser = await userModel.findOneAndUpdate(
        { email: req.user.email },
        {
          name: name || user.name,
          username: username || user.username,
          bio: bio === "" ? "" : bio,
        },
        { new: true }
      );
    }
    res.status(200).json({ message: "Profile has been updated" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.forgotPasswordController = async function (req, res) {
  let { email } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "User with this email not found" });
    let resettoken = crypto.randomBytes(16).toString("hex");
    user.resetPasswordToken = resettoken;
    await user.save();
    let resetUrl = `http://localhost:5173/reset-password/${resettoken}`;
    res.status(200).json({ resetUrl, resettoken });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.resetPasswordController = async function (req, res) {
  let { password } = req.body;
  try {
    let user = await userModel.findOne({
      resetPasswordToken: req.params.token,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let newSalt = await bcrypt.genSalt(10);
    let newHash = await bcrypt.hash(password, newSalt);
    user.password = newHash;
    await user.save();
    res.status(200).json({ message: "Password Reset Successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.getAllUsersController = async function (req, res) {
  try {
    let users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.followUserController = async function (req, res) {
  try {
    let currentUser = await userModel.findOne({ email: req.user.email });
    let usertofollow = await userModel.findOne({ _id: req.params.id });
    if (
      !currentUser.following.includes(usertofollow._id) &&
      !usertofollow.followers.includes(currentUser._id)
    ) {
      currentUser.following.push(usertofollow._id);
      usertofollow.followers.push(currentUser._id);
      await currentUser.save();
      await usertofollow.save();
      res.status(200).json({ message: "User followed" });
    } else {
      return res.status(409).json({ message: "User already followed" });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.unfollowUserController = async function (req, res) {
  try {
    let currentUser = await userModel.findOne({ email: req.user.email });
    let usertounfollow = await userModel.findOne({ _id: req.params.id });
    if (
      currentUser.following.includes(usertounfollow._id) &&
      usertounfollow.followers.includes(currentUser._id)
    ) {
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== usertounfollow._id.toString()
      );
      usertounfollow.followers = usertounfollow.followers.filter(
        (id) => id.toString() !== currentUser._id.toString()
      );
      await currentUser.save();
      await usertounfollow.save();
      res.status(200).json({ message: "User unfollowed" });
    } else {
      return res.status(409).json({ message: "Already unfollowed" });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.getAllFollowersController = async function (req, res) {
  try {
    let followers = await userModel.find({ following: req.params.userId });
    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.getOneUserController = async function (req, res) {
  try {
    let singleUser = await userModel.findOne({ _id: req.params.id });

    if (!singleUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
