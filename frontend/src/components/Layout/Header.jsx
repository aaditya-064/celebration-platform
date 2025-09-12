import React, { useEffect, useState } from "react";
import {
  Calendar,
  DoorClosed,
  Facebook,
  Image,
  LogOut,
  User,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Header = () => {
  // const url = "https://render.com/docs/web-services#port-binding";
  const url = "http://localhost:8080";
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState([]);
  const user_data = JSON.parse(localStorage.getItem("user"));
  const handleClick = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const func = async () => {
    try {
      const data = await axios({
        url: `${url}/api/v1/user/get-user`,
        method: "get",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      // console.log(data);
      setUser(data.data);
    } catch (err) {
      toast.error(err?.response?.data?.msg);
      if (err?.response?.data?.msg == "jwt expired") {
        window.location.href = "/login";
        localStorage.clear();
      }
    }
  };

  useEffect(() => {
    func();
  }, []);

  return (
    <div className="p-6 px-8 flex justify-between shadow-lg">
      <div className="flex items-center gap-6">
        <Link className="flex gap-1 items-center" to={"/event"}>
          <Calendar className="h-5" />
          Event
        </Link>
        <Link className="flex gap-1 items-center" to={"/family"}>
          <Users className="h-5" />
          Family
        </Link>
        <Link className="flex gap-1 items-center" to={"/photos"}>
          <Image className="h-5" />
          Photos
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <img
          src={
            user?.profilePicture
              ? `http://localhost:8080${user.profilePicture}`
              : "https://imgs.search.brave.com/MfCMRjbwpgFuoONjuznH5NyMPYgEXwI4nagKtkUzPOA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODVlNGJmM2NiMTFi/MjI3NDkxYzMzOWEu/cG5n"
          }
          className="h-9 w-9 object-cover rounded-[50%]"
        />
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="font-medium hover:text-blue-400"
        >
          {user?.name}
        </button>
        {isOpen ? (
          <div className="flex flex-col absolute bg-white mt-[120px] z-10 w-56 right-3 shadow-md px-5 py-2">
            <Link to={"/profile"} className="text-sm flex items-center gap-1">
              <User className="h-5" /> Profile Settings
            </Link>
            <button
              className="flex gap-1 text-sm mt-3 text-left text-red-500"
              onClick={handleClick}
            >
              <LogOut className="h-5" /> Log Out
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Header;
