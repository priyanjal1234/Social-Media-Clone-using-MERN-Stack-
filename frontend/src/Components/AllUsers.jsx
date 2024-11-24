import React, { useEffect } from "react";
import { fetchLoggedinUser, followUser, getAllUsers, unfollowUser } from "../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers, setUser } from "../redux/reducers/UserReducer";
import { Link } from "react-router-dom";

function AllUsers() {
  let { allUsers, user } = useSelector((state) => state.user);
  let dispatch = useDispatch();

  async function getLoggedinUser() {
    let fetchLoggedinUserRes = await fetchLoggedinUser()
    dispatch(setUser(fetchLoggedinUserRes.data))
  }

  async function fetchAllUsers() {
    let fetchAllUsersRes = await getAllUsers();
    dispatch(setAllUsers(fetchAllUsersRes.data));
  }

  useEffect(() => {
    // Fetch all users and the logged-in user when the component mounts
    fetchAllUsers()
  }, []);

  // Handle follow action
  async function handleFollow(id) {
    await followUser(id);
    fetchAllUsers()
    getLoggedinUser()
  }


  async function handleUnfollow(id) {
    await unfollowUser(id);
    fetchAllUsers()
    getLoggedinUser()
  }

  return (
    <div className="w-full h-screen bg-zinc-900 text-white p-10">
      <div className="w-full flex justify-between">
        <h1 className="text-3xl font-semibold mb-5">All Users</h1>
        <Link to={"/home"} className="text-blue-600">
          Go to home
        </Link>
      </div>

      <div className="flex gap-4 flex-wrap">
        {allUsers?.map((User) => (
          <div
            key={User?._id}
            className="px-3 py-2 bg-zinc-700 w-fit flex items-center gap-3"
          >
            <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
              {User?.profilePicture ? (
                <img className = "w-full h-full object-cover" src={User?.profilePicture} alt="Profile" />
              ) : (
                <img
                  className="w-full h-full object-cover"
                  src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                  alt="Default Profile"
                />
              )}
            </div>
           <div>
              <h2>{User?.username}</h2>
              <h2 className="text-zinc-400">{User?.name}</h2>
              {user?._id === User?._id ? (
                <span className="text-blue-600 cursor-pointer">Switch</span>
              ) : user &&
                user.following &&
                user.following.includes(User._id) ? (
                <span
                  onClick={() => handleUnfollow(User._id)}
                  className="text-zinc-400 cursor-pointer"
                >
                  Following
                </span>
              ) : (
                <span
                  onClick={() => handleFollow(User._id)}
                  className="text-blue-600 cursor-pointer"
                >
                  Follow
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllUsers;
