import React, { useContext } from "react";
import { StateParam } from "../../../context/context";

const Login = () => {
  const { info2, handleChangeCon, handleLogin } = useContext(StateParam);
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin();
  };

  const handleChange = (e) => {
    handleChangeCon(e);
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
            value={info2.email}
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
            value={info2.password}
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
