import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createComment, deleteComment, readComments } from "../services/CommentService";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../services/PostService";
import { setAllPosts } from "../redux/reducers/PostReducer";

function Comment() {
  const [commentContent, setcommentContent] = useState('')
  let dispatch = useDispatch()
  let { id } = useParams()
  const [allComments, setallComments] = useState([])
  let { user } = useSelector(state => state.user)

  let { allPosts } = useSelector(state => state.post)

  useEffect(() => {
    async function fetchPosts() {
      let fetchPostsRes = await getAllPosts()
      dispatch(setAllPosts(fetchPostsRes.data))
    }
    fetchPosts()
  },[])

  useEffect(() => {
    async function fetchComments() {
      let fetchCommentsRes = await readComments(id)
      setallComments(fetchCommentsRes.data)
    }
    fetchComments()
  },[allComments])

  let post = allPosts && allPosts.filter(post => post._id.toString() === id.toString())[0]

  async function handleCommentCreate(e) {
    e.preventDefault()

    await createComment(commentContent,id)
    setcommentContent('')
  }

  async function handleDelete(commentId) {
    await deleteComment(commentId,id)
  }


  return (
    <div className="w-full h-screen bg-zinc-900 flex items-center justify-center text-white">
      <Link to={"/home"} className="text-blue-600 absolute top-6 right-8">
        Go back to home
      </Link>
      <form onSubmit={handleCommentCreate}>
      <div className="w-[400px] h-fit flex  flex-col gap-3 bg-zinc-700 px-3 py-2 rounded-lg">
        <div className="w-full flex gap-4">
        <input
          value={commentContent}
          onChange={e => setcommentContent(e.target.value)}
          placeholder="Add a Comment"
          type="text"
          name="commentContent"
          className="w-full h-[50px] border-2 border-white rounded-full bg-transparent outline-none pl-4"
        />
        <button className="px-3 py-2 bg-blue-600 rounded-lg" type="submit">Add</button>
        </div>
        
         {
          allComments && allComments.map((comment) => (
            <div key={comment && comment._id} className="w-full flex items-center justify-between">
              <div>
                <p>{comment && comment.user && comment.user.username}</p>
                <p>{comment && comment.commentContent}</p>
              </div>
              <span onClick={() => handleDelete(comment && comment._id)} className="text-red-500 cursor-pointer">
                {
                  comment && comment.user && user && comment.user._id === user._id ? "Delete" : ""
                }
              </span>
            </div>
          ))
         }
     
      
      </div>  
      
      </form>
    </div>
  );
}

export default Comment;
