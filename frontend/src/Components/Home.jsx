import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedinUser } from "../services/UserService";
import { useQuery } from "@tanstack/react-query";
import { setUser } from "../redux/reducers/UserReducer";
import HomeHero from "./HomeHero";
import { getAllPosts } from "../services/PostService";
import { setAllPosts } from "../redux/reducers/PostReducer";

function Home() {
  let dispatch = useDispatch();

  async function getLoggedinUser() {
    let getLoggedinUserRes = await fetchLoggedinUser();
    dispatch(setUser(getLoggedinUserRes.data));
  }

  useEffect(() => {
    getLoggedinUser();
  }, []);

  let query2 = useQuery({
    queryKey: ["allPosts"],
    queryFn: async () => {
      let getAllPostsRes = await getAllPosts();
      return dispatch(setAllPosts(getAllPostsRes.data));
    },
  });

  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white">
      <Navbar />
      <HomeHero fetchLoggedinUser = {fetchLoggedinUser} query2={query2} />
    </div>
  );
}

export default Home;
