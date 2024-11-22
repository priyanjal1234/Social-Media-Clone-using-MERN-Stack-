import React from "react";
import { Link } from "react-router-dom";

const SingleFollowerCard = ({follower}) => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
        {follower?.profileImage ? (
          <img src={follower?.profileImage} alt="" />
        ) : (
          <img
            className="w-full h-full object-cover"
            src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
          ></img>
        )}
      </div>
      <div>
        <h2>{follower?.name}</h2>
        <h2>{follower?.username}</h2>
      </div>
      <Link to={`/profile/${follower?._id}`} className="text-blue-600">
        See Profile
      </Link>
    </div>
  );
};

export default SingleFollowerCard;
