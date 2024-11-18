import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CreateEvent = ({ onToggle }) => {
  const [info, setInfo] = useState({
    title: "",
    date: "",
    description: "",
  });
  const token = localStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios({
        url: "http://localhost:8080/api/v1/event/upload",
        method: "post",
        data: info,
        headers: { Authorization: `Bearer ${token}` },
      });
      setInfo({ ...info, title: "", date: "", description: "" });
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
    console.log(info);
  };
  return (
    <div className="relative">
      <div className="fixed bg-black bg-opacity-50 inset-0 z-10">
        <div className="flex flex-col justify-center gap-10 items-center h-screen">
          <div className="bg-white sm:px-36 px-10 py-20 rounded-3xl">
            <p className="text-3xl font-bold text-center">Create Event</p>
            <form
              className="flex flex-col gap-4 mt-10 sm:w-72"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <label for="title" className="ml-1 font-medium">
                Title
              </label>
              <input
                id="title"
                name="title"
                onChange={(e) => {
                  handleChange(e);
                }}
                value={info.title}
                type="text"
                className="border mt-[-9px] p-2 px-3 rounded placeholder:text-gray-600 outline-none"
              />
              <label for="date" className="ml-1 font-medium">
                Date
              </label>
              <input
                onChange={(e) => {
                  handleChange(e);
                }}
                id="date"
                value={info.date}
                name="date"
                type="date"
                className="block mt-[-9px] w-full border p-2 px-3 rounded placeholder:text-gray-600 outline-none"
              />

              <label for="description" className="ml-1 font-medium">
                Description
              </label>
              <textarea
                onChange={(e) => {
                  handleChange(e);
                }}
                id="description"
                className="block mt-[-9px] w-full border p-1 px-3 rounded placeholder:text-gray-600 outline-none"
                value={info.description}
                name="description"
              ></textarea>
              <div className="flex gap-2 text-center">
                <button
                  onClick={onToggle}
                  type="button"
                  className="bg-red-500 text-white hover:opacity-70 transition-all p-2 text-md rounded-lg w-1/2"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white hover:opacity-70 transition-all p-2 text-md rounded-lg w-1/2"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
