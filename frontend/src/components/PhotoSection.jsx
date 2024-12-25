import React, { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { StateParam } from "../../context/context";
import { Heart } from "lucide-react";

const PhotoSection = ({ id }) => {
  const { handlePopPhoto } = useContext(StateParam);
  const [info, setInfo] = useState({});
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const url = "http://localhost:8080";

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const res = await axios({
          url: `${url}/api/v1/photo/photo/${id}`,
          method: "get",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setInfo(res.data);
        const user = JSON.parse(localStorage.getItem("user"));
        setLiked(res.data.likes.includes(user._id));
        setLikeCount(res.data.likes.length);
      } catch (err) {
        console.error(err);
        toast.error(err?.response?.data?.msg || "Failed to fetch photo.");
      }
    };

    fetchPhoto();
  }, [id]);

  const toggleLike = async () => {
    try {
      const res = await axios({
        url: `${url}/api/v1/photo/like/${id}`,
        method: "patch",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const user = JSON.parse(localStorage.getItem("user"));
      const updatedLiked = res.data.likes.includes(user._id);
      setLiked(updatedLiked);
      setLikeCount(res.data.likes.length);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.msg || "Failed to toggle like.");
    }
  };

  const handleClose = () => {
    handlePopPhoto();
    setLiked(false); // Reset local state if needed
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
              <button onClick={toggleLike} className="flex gap-2 items-center">
                <Heart
                  strokeWidth={1}
                  className={liked ? "fill-red-800" : ""}
                />
                {likeCount}
              </button>
              <button
                className="bg-red-600 text-white px-4 py-1 rounded hover:opacity-70 transition-all"
                onClick={handleClose}
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
