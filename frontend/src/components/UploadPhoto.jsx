import React, { useState, useContext } from "react";
import { StateParam } from "../../context/context";

const UploadPhoto = ({ onToggle }) => {
  const { info, handleFormUpload, handleChangeCon, handleFileCon } =
    useContext(StateParam);

  const handleUpload = async (e) => {
    e.preventDefault();
    handleFormUpload();
  };

  const handleChange = (e) => {
    handleChangeCon(e);
  };

  const handleFile = (e) => {
    handleFileCon(e);
  };
  return (
    <>
      <div className="relative">
        <div className="fixed bg-black bg-opacity-50 inset-0 z-10">
          <div className="flex flex-col justify-center gap-10 items-center h-screen">
            <form
              onSubmit={handleUpload}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Select Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={(e) => handleFile(e)}
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
                  onClick={onToggle}
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
        </div>
      </div>
    </>
  );
};

export default UploadPhoto;
