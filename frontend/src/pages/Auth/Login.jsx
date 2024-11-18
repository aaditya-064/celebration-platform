import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { parse } from "postcss";

const Login = () => {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios({
        url: "http://localhost:8080/api/v1/user/login",
        method: "post",
        data: info,
      });
      const payload = JSON.parse(data.request.response);
      const token = payload.token;
      localStorage.setItem("token", token);
      toast.success(data.data.msg);
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.msg);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };
  return (
    <div className="flex flex-col justify-center gap-10 items-center h-screen">
      <div className="bg-gray-300 sm:px-36 px-10 py-20 rounded-3xl">
        <p className="text-3xl font-bold text-center">Log In</p>
        <form
          className="flex flex-col gap-4 mt-10 sm:w-72"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
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
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
