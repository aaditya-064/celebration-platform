import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Image, Plus, User, Users } from "lucide-react";
import UploadPhoto from "../components/UploadPhoto";
import toast from "react-hot-toast";
import axios from "axios";

const PhotosPage = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState([]);

  const getPhotos = async () => {
    try {
      const photos = await axios({
        url: "http://localhost:8080/api/v1/photo/get/photos",
        method: "get",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setInfo(photos.data);
    } catch (err) {
      toast.error(err?.response?.data?.msg);
    }
  };
  useEffect(() => {
    getPhotos();
  }, []);

  const handleToggle = () => {
    setOpen(!open);
    console.log(open);
  };
  return (
    <Layout>
      <div className="p-4 mt-8">
        <div className="flex justify-between items-center">
          <p className="flex gap-2 font-bold text-2xl items-center">
            <Image />
            Photos
          </p>
          <button
            onClick={handleToggle}
            className="flex gap-1 text-md bg-[#4f46e5] items-center px-3 py-2 text-white rounded-md hover:bg-white hover:text-[#4f46e5] border border-[#4f46e5] transition-all"
          >
            <Plus />
            Upload Photo
          </button>
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
            Family Photos
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
            My Photos
          </button>
        </div>
        <div className="mt-10 grid grid-cols-2">
          {info.map((item) => (
            <div key={item._id}>
              <div className="flex items-center">
                {/* <img
                  src={`http://localhost:8080${item.profilePicture}`}
                  alt=""
                /> */}
                <p className="text-lg font-bold ml-2">{item.name}</p>
              </div>
              <p className="text-md ml-2">{item.description}</p>
              <img
                src={`http://localhost:8080${item.imageUrl}`}
                className="h-96 rounded-lg mt-3"
              />
            </div>
          ))}
        </div>
      </div>
      {open ? <UploadPhoto onToggle={handleToggle} /> : null}
    </Layout>
  );
};

export default PhotosPage;
