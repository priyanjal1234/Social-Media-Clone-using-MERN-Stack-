import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOnePost } from "../services/PostService";
import { setSinglePost } from "../redux/reducers/PostReducer";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

function PostDetail() {
  let { id } = useParams();

  const [images, setImages] = useState([]);

  async function getSinglePost() {
    let getSinglePostRes = await getOnePost(id);
    setSinglePost(getSinglePostRes.data);
    setImages(getSinglePostRes.data.images);
  }

  useEffect(() => {
    getSinglePost();
  }, []);

  return (
    <div className="w-full h-screen bg-zinc-900 text-white p-10">
      <div className="w-full flex justify-between">
      <h1 className="text-3xl font-semibold mb-5">This is read only</h1>
      <Link className="text-blue-600" to={'/home'}>Go to website</Link>
      </div>
      <div className="w-[400px] h-[390px] border-2 border-white">
        <Swiper spaceBetween={10} slidesPerView={1} style={{ height: "100%" }}>
          {images.map((image, index) => (
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
    </div>
  );
}

export default PostDetail;
