import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/UserService";
import { toast } from "react-toastify";
import { setLoggedin, setUser } from "../redux/reducers/UserReducer";

function Profile() {
  let { user } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  async function handleLogout() {
    let logoutUserRes = await logoutUser();
    if (logoutUserRes.status === 200) {
      toast.success("Logout Success");
      dispatch(setLoggedin(false));
      dispatch(setUser(null));
      navigate("/login");
    }
  }

  return (
    <div className="w-full h-screen bg-zinc-900 text-white p-10">
      <div className="w-full justify-between flex items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-[50px] h-[50px] overflow-hidden border-2 border-white rounded-full">
            {user?.profilePicture === "" ? (
              <img
                className="w-full h-full object-cover"
                src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                alt=""
              />
            ) : (
              <img
                className="w-full h-full object-cover"
                src={user?.profilePicture}
                alt=""
              />
            )}
          </div>
          <h1 className="text-3xl font-semibold mb-5">Hello, {user?.name}</h1>
        </div>
        <span onClick={handleLogout} className="text-red-500 cursor-pointer">
          Logout
        </span>
        <Link to={"/home"} className="text-blue-600">
          Go back to home
        </Link>
      </div>
      <h2 className="text-lg font-semibold mb-4">Name: {user?.name}</h2>
      <h2 className="text-lg font-semibold mb-4">Username: {user?.username}</h2>
      <h2 className="text-lg font-semibold mb-4">Email: {user?.email}</h2>
      <h2 className="text-lg font-semibold mb-4">
        Posts: {user?.posts?.length}
      </h2>

      <h2 className="text-lg font-semibold mb-4">
        Followers: {user?.followers?.length}
      </h2>

      <h2 className="text-lg font-semibold mb-4">
        Following: {user?.following?.length}
      </h2>
      {user?.bio !== '' && (
        <h2 className="text-lg font-semibold mb-4">Bio: {user?.bio}</h2>
      )}
      <Link
        to={"/edit-profile"}
        className="px-3 py-2 bg-blue-600 rounded-lg block mt-3 w-fit"
      >
        Edit Profile
      </Link>
      {user?.followers?.length > 0 && (
        <Link to={`/followers-list/${user?._id}`} className="text-md font-bold block mt-3">
          See all Followers
        </Link>
      )}
    </div>
  );
}

export default Profile;
