import React, { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { StateParam } from "../../context/context";
import { Heart } from "lucide-react";

const PhotoSection = ({ id }) => {
  const { handlePopPhoto } = useContext(StateParam);
  const [info, setInfo] = useState({});
  const [liked, setLiked] = useState(false);
  const url = "http://localhost:8080";
  console.log("first", liked);

  const fetchPhoto = async () => {
    try {
      const res = await axios({
        url: `${url}/api/v1/photo/photo/${id}`,
        method: "get",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setInfo({ ...info, ...res.data });
      // console.log(res.data);
      // console.log(res.data);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.msg);
    }
  };
  useEffect(() => {
    fetchPhoto();
  }, []);

  const toggleLike = async (id) => {
    try {
      const res = await axios({
        url: `${url}/api/v1/photo/like/${id}`,
        method: "patch",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setLiked(!liked);
      const user = JSON.parse(localStorage.getItem("user"));
      res.data.likes.includes(user._id) ? setLiked(true) : setLiked(false);
      // setLiked(!liked);
    } catch (err) {
      console.log(err);
      toast.error(err?.reponse?.data?.msg);
    }
  };

  return (
    <div className="relative">
      <div className="fixed bg-black bg-opacity-50 inset-0 z-10">
        <div className="flex flex-col justify-center items-center h-screen p-4">
          <div className="bg-white py-4 px-1 rounded">
            <p className="text-left text-lg font-bold">{info.name}</p>
            <p className="ml-2">{info.description}</p>
            <img src={`${url}${info.imageUrl}`} alt="" className="w-96" />
            <div className="flex justify-between mt-2">
              <button
                onClick={() => {
                  toggleLike(info._id);
                }}
                className="flex gap-2"
              >
                {liked || info?.likes?.length == 0 ? (
                  <Heart strokeWidth={1} />
                ) : (
                  <Heart strokeWidth={1} className="fill-red-800" />
                )}
                {info?.likes?.length}
              </button>
              <button
                className="bg-red-600 text-white px-4 py-1 rounded hover:opacity-70 transition-all"
                onClick={() => {
                  handlePopPhoto();
                  setLiked(false);
                  console.log(liked);
                }}
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

export default PhotoSection;
