const express = require('express')
const { isLoggedin } = require('../middlewares/isLoggedin')
const { createCommentController, readAllCommentsController, deleteCommentController } = require('../controllers/commentController')
const router = express.Router()

router.post("/create",isLoggedin,createCommentController)

router.get("/all/:id",readAllCommentsController)

router.delete("/delete/:postId/:commentId",isLoggedin,deleteCommentController)

module.exports = router