import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddFamily = ({ onToggle }) => {
  const [info, setInfo] = useState({
    text: "",
  });
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
    const filteredData = users.filter((item) => item.email == value);
    setFilteredData(filteredData);
  };

  const allUser = async () => {
    const data = await axios({
      url: "http://localhost:8080/api/v1/user/all-user",
      method: "get",
    });
    setUsers(data.data);
    try {
    } catch (err) {
      toast.error(err?.response?.data?.msg);
    }
  };
  useEffect(() => {
    allUser();
  }, []);
  return (
    <div className="relative">
      <div className="fixed inset-0 bg-black bg-opacity-50 z-10">
        <div className="flex flex-col h-screen p-10 justify-center items-center">
          <div className="bg-white sm:px-36 px-10 py-20 rounded-3xl shadow-3xl">
            <div className="flex flex-col">
              <input
                onChange={(e) => {
                  handleChange(e);
                }}
                name="text"
                className="outline-none border border-blue-500 p-2 rounded placeholder:text-gray-700 sm:w-96"
                placeholder="Search..."
              />
              {info.text.length >= 1 ? (
                <div>
                  {filteredData.map((item) => (
                    <div
                      key={item._id}
                      className="mt-3 ml-1 px-4 py-2 border border-gray-400 shadow-lg rounded"
                    >
                      <p>{item.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="flex justify-center mt-7">
              <button
                onClick={onToggle}
                className="bg-red-500 text-white p-2 rounded hover:opacity-65 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFamily;
