import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  let navbarData = ["All-Users", "Profile",  "Create-Post"];
  let { user } = useSelector((state) => state.user);

  return (
    <nav className="w-full h-[75px] border-b-2 border-white flex items-center justify-between px-5">
      <h1 className="text-2xl font-semibold">Social Media</h1>
      <ul className="flex items-center gap-6">
        {navbarData.map((item, index) => (
          <li key={index} className="text-lg hover:text-blue-600">
            <Link to={`/${item.toLowerCase()}`}>{item}</Link>
          </li>
        ))}
      </ul>
      <div className="w-[45px] h-[45px] text-lg font-semibold bg-orange-500 rounded-full flex items-center justify-center">
        {user?.name.split("")[0]}
      </div>
    </nav>
  );
}

export default Navbar;
