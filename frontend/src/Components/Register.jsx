import React, { useEffect, useState } from "react";
import { registerUser } from "../services/UserService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useFormHandler from "../hooks/useFormHandler";
import registerSchema from "../schemas/registerSchema";

function Register() {
  let navigate = useNavigate();
  let { isLoggedin } = useSelector((state) => state.user);

  let { values, handleChange, errors } = useFormHandler({
    initialValues: { name: "", username: "", email: "", password: "" },
    validationSchema: registerSchema,
  });

  useEffect(() => {
    if (isLoggedin) {
      return navigate("/home");
    }
    return navigate("/");
  }, []);

  async function registerSubmit(e) {
    e.preventDefault()
    let registerUserRes = await registerUser(values);
    if (registerUserRes.status === 201) {
      toast.success("Please check your email for verification.");
      navigate("/verify-email");
    }
  }

  return (
    <div className="w-full h-screen bg-zinc-900 text-white flex items-center justify-center">
      <div className="w-full md:w-[390px] h-fit border-2 border-white p-4">
        <h1 className="text-3xl font-semibold text-center">
          Create Your Account
        </h1>
        <form onSubmit={registerSubmit} className="mt-5">
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            value={values.name}
            className="block px-3 py-2 bg-zinc-700 outline-none mb-3 mt-2 w-full rounded-lg  focus:border-blue-500"
            type="text"
            placeholder="Name"
            name="name"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
          <label htmlFor="username">Username</label>
          <input
            onChange={handleChange}
            value={values.username}
            className="block px-3 py-2 bg-zinc-700 outline-none mb-3 mt-2 w-full rounded-lg  focus:border-blue-500"
            type="text"
            placeholder="Username"
            name="username"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username}</p>
          )}
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            value={values.email}
            className="block px-3 py-2 bg-zinc-700 outline-none mb-3 mt-2 w-full rounded-lg  focus:border-blue-500"
            type="email"
            placeholder="Email"
            name="email"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email}</p>
          )}
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            value={values.password}
            className="block px-3 py-2 bg-zinc-700 outline-none mb-3 mt-2 w-full rounded-lg  focus:border-blue-500"
            type="password"
            placeholder="Password"
            name="password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password}</p>
          )}
          <button
            className="w-full h-[40px] bg-blue-600 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out"
            type="submit"
          >
            Create
          </button>
        </form>
        <span className="block mt-3">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-600 cursor-pointer">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
