import React, { useEffect, useContext, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Image, Plus, User, Users } from "lucide-react";
import UploadPhoto from "../components/UploadPhoto";
import { StateParam } from "../../context/context";

const PhotosPage = () => {
  const {
    open,
    info,
    familyPhoto,
    handleGetMyPhotos,
    handleFamilyPhotos,
    handleModelCon,
  } = useContext(StateParam);
  const [active, setActive] = useState(false);

  const getPhotos = async () => {
    handleGetMyPhotos();
    handleFamilyPhotos();
  };
  useEffect(() => {
    getPhotos();
  }, []);

  const handleToggle = () => {
    handleModelCon();
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
        <div className="mt-10 grid grid-cols-3 gap-10">
          {!active ? (
            <>
              {info.map((item) => (
                <div key={item._id} className="shadow-xl p-4">
                  <p className="text-lg font-bold ml-2">{item.name}</p>
                  <p className="text-md ml-2 mt-2">{item.description}</p>
                  <img
                    src={`http://localhost:8080${item.imageUrl}`}
                    className="h-96 object-contain rounded-lg mt-3"
                  />
                </div>
              ))}{" "}
            </>
          ) : (
            <>
              {familyPhoto.map((item) => (
                <div key={item._id} className="shadow-xl p-4">
                  <p className="text-lg font-bold ml-2">{item.name}</p>
                  <p className="text-md ml-2 mt-2">{item.description}</p>
                  <img
                    src={`http://localhost:8080${item.imageUrl}`}
                    className="h-96 object-contain rounded-lg mt-3"
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      {open ? <UploadPhoto onToggle={handleToggle} /> : null}
    </Layout>
  );
};

export default PhotosPage;
