import React, { useState, useContext } from "react";
import Layout from "../components/Layout/Layout";
import { Eye } from "lucide-react";
import { StateParam } from "../../context/context";

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { info2, handleProfile, handleChangeCon, handleFileCon } =
    useContext(StateParam);

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleProfile();
  };

  const handleChange = (e) => {
    handleChangeCon(e);
  };

  const handleFile = (e) => {
    handleFileCon(e);
  };
  return (
    <Layout>
      <div className="p-10 flex justify-center">
        <form
          className="flex flex-col items-center gap-4 shadow-lg py-8 w-96"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div>
            <p className="text-3xl font-bold text-center">Edit Profile </p>
            <div className="flex flex-col gap-2 mt-5">
              <label htmlFor="name" className="text-sm">
                Full Name:
              </label>
              <input
                onChange={(e) => {
                  handleChange(e);
                }}
                value={info2.name}
                type="text"
                name="name"
                id="name"
                className="border rounded border-gray-400 h-10 w-[100%] px-2"
              />
            </div>
            <div className="flex flex-col gap-2 mt-5">
              <label htmlFor="email" className="text-sm">
                Email Address:{" "}
              </label>
              <input
                type="email"
                onChange={(e) => {
                  handleChange(e);
                }}
                value={info2.email}
                name="email"
                id="email"
                className="border rounded border-gray-400 h-10 w-[100%] px-2"
              />
            </div>

            <div className="flex flex-col gap-2 mt-5">
              <label htmlFor="password" className="text-sm">
                Password:{" "}
              </label>
              <div className="relative flex">
                <input
                  type={showPassword ? "text" : "password"}
                  className="border rounded border-gray-400 h-10 w-[100%] px-2"
                  name="password"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  id="password"
                  placeholder="Password"
                  value={info2.password}
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="absolute right-1 top-[21%]"
                >
                  <Eye
                    className={showPassword ? "text-blue-800" : "text-gray-400"}
                  />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-5">
              <label htmlFor="profilePicture" className="text-sm">
                Profile Picture:
              </label>
              <input
                type="file"
                accept="image/*"
                className="border rounded pt-1.5 border-gray-400 h-10 w-[100%] px-2 text-sm"
                name="profilePicture"
                id="profilePicture"
                // value={info2.profilePicture}
                onChange={(e) => {
                  handleFile(e);
                }}
              />
            </div>
            <div className="flex justify-center mt-5">
              <button
                type="submit"
                className="w-[50%] bg-blue-500 border border-blue-500 py-2 px-3 text-white rounded hover:bg-white hover:text-blue-500 transition-all"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;
