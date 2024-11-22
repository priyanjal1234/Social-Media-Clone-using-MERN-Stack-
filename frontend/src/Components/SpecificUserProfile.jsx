import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getOneUser } from "../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { setSpecificUser } from "../redux/reducers/UserReducer";

const SpecificUserProfile = () => {
  let { id } = useParams();
  let dispatch = useDispatch();

  let { specificUser } = useSelector((state) => state.user);

  async function fetchSingleUserProfile() {
    let fetchSingleUserProfileRes = await getOneUser(id);
    dispatch(setSpecificUser(fetchSingleUserProfileRes.data));
  }

  useEffect(() => {
    fetchSingleUserProfile();
  }, []);

  return (
    <div className="w-full h-screen bg-zinc-900 text-white p-10">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-3xl font-semibold">
          Profile of {specificUser?.name}
        </h1>
        <Link to={"/home"} className="text-blue-600">
          Go back to home
        </Link>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Name: {specificUser?.name}</h2>
        <h2 className="text-lg font-semibold">Username: {specificUser?.username}</h2>
        <h2 className="text-lg font-semibold">Email: {specificUser?.email}</h2>
        <h2 className="text-lg font-semibold">Followers: {specificUser?.followers?.length}</h2>
        <h2 className="text-lg font-semibold">Following: {specificUser?.following?.length}</h2>
      </div>
    </div>
  );
};

export default SpecificUserProfile;
