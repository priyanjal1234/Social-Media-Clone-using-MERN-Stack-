import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaRegHeart, FaRegPaperPlane } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa6";

import "swiper/swiper-bundle.css";
import { deletePost, likePost } from "../services/PostService";
import { Link } from "react-router-dom";
import ShareOptions from "./ShareOptions";
import { setUser } from "../redux/reducers/UserReducer";

function HomeHero({ query2,fetchLoggedinUser }) {

  let { allPosts } = useSelector((state) => state.post);
  let { user } = useSelector((state) => state.user);

  let dispatch = useDispatch()

  const [showShareOptions, setShowShareOptions] = useState(
    Array(allPosts?.length).fill(false)
  );
  const [selectedPostUrl, setSelectedPostUrl] = useState("");

  async function handleLike(id) {
    await likePost(id);

    query2.refetch();
  }

  function handleShare(id, index) {
    setSelectedPostUrl(`http://localhost:5173/post/${id}`);
    let newshowShareOptions = [...showShareOptions];
    newshowShareOptions[index] = true;
    setShowShareOptions(newshowShareOptions);
  }

  function closeShareOptions(index) {
    let naya = [...showShareOptions]
    naya[index] = false
    setShowShareOptions(naya);
  }

  async function handleDeletePost(id) {
    await deletePost(id)
    let updatedUser = await fetchLoggedinUser()
    dispatch(setUser(updatedUser.data))
    query2.refetch()
  }

  return (
    <div className="homehero px-5 py-5 ">
      <h1 className="text-2xl mb-5">All Posts</h1>
      <div className="flex flex-wrap gap-6">
        {allPosts?.map((post, index) => (
          <div
            className="w-[390px] h-fit border-2 border-white mb-5"
            key={post?._id}
          >
            <div className="w-full h-[70px] border-b-2 border-white flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <div className="w-[50px] h-[50px] overflow-hidden border-2 border-white rounded-full">
                  {post?.user?.profilePicture ? (
                    <img
                      src={post?.user?.profilePicture}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  ) : (
                    <img
                      src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                      alt=""
                    />
                  )}
                </div>
                <h2>{post?.user?.username}</h2>
                <p>
                  {post.createdAt
                    ? formatDistanceToNow(new Date(post.createdAt), {
                        addSuffix: true,
                      })
                    : ""}
                </p>
              </div>
              <span onClick={() => handleDeletePost(post?._id)} className="text-red-500 cursor-pointer">
                {user?._id === post?.user?._id ? "Delete" : ""}
              </span>
            </div>
            <div className="w-full h-[390px] border-b-2 border-white">
              <Swiper
                spaceBetween={10}
                slidesPerView={1}
                style={{ height: "100%" }}
              >
                {post?.images?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`Post image ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="w-full h-[80px] px-3 py-2">
              <div className="flex items-center gap-3">
                {post?.likes?.includes(user?._id) ? (
                  <span
                    onClick={() => handleLike(post?._id)}
                    className="text-2xl text-red-500"
                  >
                    <FaHeart />
                  </span>
                ) : (
                  <span
                    onClick={() => handleLike(post?._id)}
                    className="text-2xl"
                  >
                    <FaRegHeart />
                  </span>
                )}
                <Link to={`/comment/${post?._id}`} className="text-2xl">
                  <FaRegComment />
                </Link>
                <span
                  onClick={() => handleShare(post?._id, index)}
                  className="text-2xl"
                >
                  <FaRegPaperPlane />
                </span>
              </div>
              <span>{post?.likes?.length} likes</span>
              <p className="text-zinc-500 mb-2">{post && post.comments && post.comments.length === 0 ? "No Comments" : `Post has ${post && post.comments && post.comments.length} Comments`}</p>
            </div>

            {showShareOptions[index] ? <ShareOptions onClose = {() => closeShareOptions(index)} postUrl = {selectedPostUrl}  /> : ""}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeHero;
