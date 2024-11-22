import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../services/UserService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedin } from "../redux/reducers/UserReducer";
import { Link, useNavigate } from "react-router-dom";
import useFormHandler from "../hooks/useFormHandler";
import loginSchema from "../schemas/loginSchema";

function Login() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { isLoggedin } = useSelector((state) => state.user);
  
  let {values,handleChange,errors} = useFormHandler({initialValues: {email:'',password: ''},validationSchema: loginSchema})

  useEffect(() => {
    if (isLoggedin) {
      return navigate("/home");
    }
    return navigate("/login");
  }, []);

  async function onSubmit(e) {
    e.preventDefault()
    let loginUserRes = await loginUser(values);
    if (loginUserRes.status === 200) {
      toast.success("Login Success");
      dispatch(setLoggedin(true));
      navigate("/home");
    }
  }

  return (
    <div className="w-full h-screen bg-zinc-900 text-white flex items-center justify-center">
      <div className="w-[400px] h-fit p-4 border-2 border-white">
        <h1 className="text-3xl font-semibold text-center">
          Login Your Account
        </h1>
        <form className="mt-5" onSubmit={onSubmit}>
          <label htmlFor="email">Email</label>
          <input
            className="block mt-2 mb-3 px-3 py-2 bg-zinc-700 w-full outline-none"
            type="email"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email}</p>
          )}
          <label htmlFor="password">Password</label>
          <input
            className="block mt-2 mb-3 px-3 py-2 bg-zinc-700 w-full outline-none"
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password}</p>
          )}
          <button
            className="w-full h-[40px] bg-blue-600 rounded-full"
            type="submit"
          >
            Login
          </button>
        </form>
        <Link to={"/forgot-password"} className="text-blue-600 block mt-3">
          Forgot Password
        </Link>
        <span className="block mt-3">
          Don't have an account?{" "}
          <Link className="text-blue-600" to={"/"}>
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
