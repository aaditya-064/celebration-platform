import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { StateParam } from "../../context/context";
import AddFamily from "../components/AddFamily";
import { CircleUser, UserMinus, UserPlus, Users } from "lucide-react";

const FamilyPage = () => {
  const {
    info,
    info2,
    users,
    filteredData,
    getFamilyCon,
    handleChangeCon,
    getUserCon,
    allUserCon,
    handleAddCon,
    handleFilteredData,
    searchUser,
  } = useContext(StateParam);

  const getFamilyMembers = async () => {
    getFamilyCon();
  };

  // console.log(
  //   "This is info",
  //   info,
  //   "This is info2",
  //   info2,
  //   "This is users",
  //   users,
  //   "This is filtered Data",
  //   filteredData
  // );

  const handleChange = (e) => {
    handleChangeCon(e);
    handleFilteredData(e.target.value);
  };

  const allUser = async () => {
    allUserCon();
  };

  const handleAdd = async (id) => {
    handleAddCon(id);
  };

  useEffect(() => {
    allUser();
  }, []);

  useEffect(() => {
    getFamilyMembers();
  }, []);

  // const handleClick = () => {
  //   setOpen(!open);
  // };

  return (
    <Layout>
      <div className="p-4">
        <p className="flex items-center gap-2 text-2xl font-bold">
          <Users />
          Family Members{" "}
        </p>
        <div className="mt-5 bg-white shadow-md p-5 rounded-lg">
          <input
            name="text"
            onChange={(e) => {
              handleChange(e);
            }}
            value={info2.text}
            placeholder="Search family member by email"
            className="border w-full p-2 rounded"
          />
          <div className="flex flex-col">
            {info2?.text?.length >= 1 ? (
              <div className="mt-5 shadow-md">
                {filteredData.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between border w-full p-4 rounded"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        className="h-11 w-11 object-cover rounded-[50%]"
                        src={
                          item.profilePicture
                            ? `http://localhost:8080${item.profilePicture}`
                            : "https://imgs.search.brave.com/MfCMRjbwpgFuoONjuznH5NyMPYgEXwI4nagKtkUzPOA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODVlNGJmM2NiMTFi/MjI3NDkxYzMzOWEu/cG5n"
                        }
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="font-normal text-md">{item.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleAdd(item._id);
                      }}
                      className="bg-[#4f46e5] text-white px-3 rounded-lg text-md mt-2 hover:opacity-80 transition-all"
                    >
                      <div className="flex font-medium">
                        <UserPlus className="h-5 mt-[2px] mr-1" /> Add
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {/* <button
          onClick={handleClick}
          className="absolute right-10 bg-blue-500 text-white p-2 rounded border hover:bg-white hover:border-blue-500 hover:text-blue-500 transition-all"
        >
          Add Friends
        </button> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {info.map((item) => (
            <div
              key={item._id}
              className="flex gap-2 items-center justify-between bg-white shadow-md p-3 rounded-lg"
            >
              <div className="flex gap-2">
                <img
                  className="h-11 w-11 object-cover rounded-[50%]"
                  src={
                    item.profilePicture
                      ? `http://localhost:8080${item.profilePicture}`
                      : "https://imgs.search.brave.com/MfCMRjbwpgFuoONjuznH5NyMPYgEXwI4nagKtkUzPOA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODVlNGJmM2NiMTFi/MjI3NDkxYzMzOWEu/cG5n"
                  }
                />
                <div>
                  <p className="text-md font-medium">{item.name}</p>
                  <p className="text-sm">{item.email}</p>
                </div>
              </div>
              <button
                className="text-red-600 hover:opacity-40 transition-all disabled"
                // onClick={alert(
                //   "You cannot do that. I'm bored to insert that functionality."
                // )}
              >
                <UserMinus />
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FamilyPage;
