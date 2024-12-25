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

  const fetchPhoto = async () => {
    try {
      const res = await axios({
        url: `${url}/api/v1/photo/photo/${id}`,
        method: "get",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setInfo(res.data);

      // Set initial liked state based on user's like status
      const user = JSON.parse(localStorage.getItem("user"));
      setLiked(res.data.likes?.includes(user._id));
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.msg);
    }
  };

  useEffect(() => {
    fetchPhoto();
  }, [id]); // Add id as dependency

  const toggleLike = async (photoId) => {
    try {
      const res = await axios({
        url: `${url}/api/v1/photo/like/${photoId}`,
        method: "patch",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      // Update both the liked state and the likes array in info
      const user = JSON.parse(localStorage.getItem("user"));
      const newLikedState = res.data.likes.includes(user._id);
      setLiked(newLikedState);
      setInfo((prevInfo) => ({
        ...prevInfo,
        likes: res.data.likes,
      }));
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.msg);
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
                onClick={() => toggleLike(info._id)}
                className="flex gap-2 items-center"
              >
                <Heart
                  strokeWidth={1}
                  className={liked ? "fill-red-800" : ""}
                />
                <span>{info?.likes?.length || 0}</span>
              </button>
              <button
                className="bg-red-600 text-white px-4 py-1 rounded hover:opacity-70 transition-all"
                onClick={handlePopPhoto}
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
