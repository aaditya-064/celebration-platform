import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios({
      url: "http://localhost:8080/api/v1/user/register",
      method: "post",
      data: info,
    });
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };
  return (
    <div className="flex flex-col justify-center gap-10 items-center h-screen">
      <div className="bg-gray-300 sm:px-36 px-10 py-20 rounded-3xl">
        <p className="text-3xl font-bold text-center">Sign Up</p>
        <form
          className="flex flex-col gap-4 mt-10 sm:w-72"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            placeholder="Full Name"
            onChange={(e) => {
              handleChange(e);
            }}
            value={info.name}
            name="name"
            type="text"
            className="border p-1 px-3 rounded placeholder:text-gray-600 outline-none"
          />
          <input
            placeholder="Email Address"
            onChange={(e) => {
              handleChange(e);
            }}
            value={info.email}
            name="email"
            type="email"
            className="block w-full border p-1 px-3 rounded placeholder:text-gray-600 outline-none"
          />
          <input
            placeholder="Password"
            onChange={(e) => {
              handleChange(e);
            }}
            name="password"
            value={info.password}
            type="password"
            className="block w-full border p-1 px-3 rounded placeholder:text-gray-600 outline-none"
          />

          <div className="text-center">
            <button type="submit" className="bg-white p-1 rounded-lg w-1/2">
              Sign Up
            </button>
          </div>
          <Link to={"/login"} className="text-blue-500 text-sm mt-[-10px] ml-2">
            Already have an account? Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;