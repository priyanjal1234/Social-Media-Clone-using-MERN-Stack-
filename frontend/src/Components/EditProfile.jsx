import React, { useEffect, useRef, useState } from "react";
import { updateUser } from "../services/UserService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function EditProfile() {
  let navigate = useNavigate();
  let imageRef = useRef(null);
  const [profilePicture, setprofilePicture] = useState();
  const [name, setname] = useState("");
  const [username, setusername] = useState("");
  const [bio, setbio] = useState("");

  let { user } = useSelector((state) => state.user);

  useEffect(() => {
    setname(user?.name);
    setusername(user?.username);
    setbio(user?.bio);
  }, []);

  async function handleUpdateProfile(e) {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("profilePicture", profilePicture);
    formdata.append("name", name);
    formdata.append("username", username);
    formdata.append("bio", bio === "" ? "" : bio);
    let editProfileRes = await updateUser(formdata);
    if (editProfileRes.status === 200) {
      toast.success("Profile is Updated");
      navigate("/home");
    }
  }

  function handleImageSet() {
    imageRef.current.click();
  }

  return (
    <div className="w-full h-screen bg-zinc-900 text-white p-10">
      <div className="w-full flex justify-between">
        <h1 className="text-3xl font-semibold mb-5">Edit Profile</h1>
        <Link to={"/profile"} className="text-blue-600">
          Go to Profile
        </Link>
      </div>
      <form onSubmit={handleUpdateProfile}>
        <div>
          <input
            onChange={(e) => setprofilePicture(e.target.files[0])}
            ref={imageRef}
            className="hidden"
            type="file"
            name="profilePicture"
            accept="image/*"
          />
          <button
            type="button"
            onClick={handleImageSet}
            className="px-3 py-2 bg-blue-600 rounded-lg"
          >
            Upload Profile Picture
          </button>
        </div>
        <div className="mt-5">
          <input
            value={name}
            onChange={(e) => setname(e.target.value)}
            className="px-3 py-2 bg-zinc-700 outline-none mr-4"
            type="text"
            placeholder="New Name"
            name="name"
          />
          <input
            value={username}
            onChange={(e) => setusername(e.target.value)}
            className="px-3 py-2 bg-zinc-700 outline-none mr-4"
            type="text"
            placeholder="New Username"
            name="username"
          />
          <input
            value={bio}
            onChange={(e) => setbio(e.target.value)}
            className="px-3 py-2 bg-zinc-700 outline-none mr-4"
            placeholder="Bio"
            name="bio"
          ></input>
        </div>
        <button
          className="block mt-3 px-3 py-2 bg-blue-600 rounded-lg"
          type="submit"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
