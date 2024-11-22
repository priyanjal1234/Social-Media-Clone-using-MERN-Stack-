import React, { useEffect } from "react";
import { getAllFollowers } from "../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { setFollowers } from "../redux/reducers/UserReducer";
import SingleFollowerCard from "./SingleFollowerCard";
import { Link, useParams } from "react-router-dom";

const FollowersList = () => {
  let dispatch = useDispatch();

  let { userId } = useParams()

  let { loggedinUserFollowers } = useSelector((state) => state.user);

  async function fetchAllFollowers() {
    let getAllFollowersRes = await getAllFollowers(userId);
    dispatch(setFollowers(getAllFollowersRes.data));
  }

  useEffect(() => {
    fetchAllFollowers();
  }, []);

  return (
    <div className="w-full h-screen bg-zinc-900 text-white p-10">
      <div className="w-full flex justify-between">
      <h1 className="text-3xl font-semibold mb-5">Followers List</h1>
      <Link to={'/profile'} className="text-blue-600">Go to Profile</Link>
      </div>

      <div>
        {loggedinUserFollowers?.map((follower) => (
          <SingleFollowerCard follower = {follower}/>
        ))}
      </div>
    </div>
  );
};

export default FollowersList;
