import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { Image, User, Users } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

const PhotosPage = () => {
  const [active, setActive] = useState(false);
  const [info, setInfo] = useState({});
  const token = localStorage.getItem("token");
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const uploadPhoto = await axios({
        url: "http://localhost:8080/api/v1/photo/upload/photo",
        method: "post",
        headers: { Authorization: `Bearer ${token}` },
        data: info,
      });
      console.log(uploadPhoto);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.msg);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
  };
  return (
    <Layout>
      <div className="p-4 mt-8">
        <div className="flex justify-between items-center">
          <p className="flex gap-2 font-bold text-2xl items-center">
            <Image />
            Photos
          </p>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            className={
              active
                ? "flex items-center rounded p-2 gap-0.5 bg-[#4f46e5] text-white"
                : "flex items-center rounded p-2 gap-0.5"
            }
            onClick={() => {
              setActive(!active);
            }}
          >
            <Users className="h-5" />
            Family Photos (false)
          </button>
          <button
            className={
              !active
                ? "flex items-center rounded p-2 gap-0.5 bg-[#4f46e5] text-white"
                : "flex items-center rounded p-2 gap-0.5"
            }
            onClick={() => {
              setActive(!active);
            }}
          >
            <User className="h-5" />
            My Photos (true)
          </button>
        </div>
        <form
          onSubmit={handleUpload}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Select Photo</label>
            <input
              type="file"
              accept="image/*"
              name="imageUrl"
              value={info.imageUrl}
              onChange={(e) => handleChange(e)}
              className="w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-[#4f46e5] file:text-white
            hover:file:opacity-75 transition-all"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              placeholder="Write a description..."
              name="description"
              onChange={(e) => handleChange(e)}
              value={info.description}
              className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              rows="3"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#4f46e5] text-white px-4 py-2 rounded-md flex items-center hover:bg-primary/90 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-upload w-5 h-5 mr-2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" x2="12" y1="3" y2="15"></line>
              </svg>
              Share
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default PhotosPage;
