import React, { useContext, useEffect } from "react";
import { StateParam } from "../../context/context";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import CreateEvent from "../components/CreateEvent";
import { Calendar, MessageCircle, Plus } from "lucide-react";

const EventPage = () => {
  const {
    info,
    info2,
    open,
    handleGetEvents,
    handleUnjoinedEvents,
    handleJoinEvent,
    handleModelCon,
  } = useContext(StateParam);
  useEffect(() => {
    const getEvents = async () => {
      handleGetEvents();
    };

    const unjoinedEvents = async () => {
      handleUnjoinedEvents();
    };
    getEvents();
    unjoinedEvents();
  }, []);

  const handleJoin = async (id) => {
    handleJoinEvent(id);
  };

  const handleModel = () => {
    handleModelCon();
  };

  return (
    <Layout>
      <div className="p-4">
        <Link
          onClick={handleModel}
          className="flex items-center gap-2 bg-blue-500 text-white p-2 rounded hover:opacity-60 transition-all absolute right-5"
        >
          <Plus /> Create Event
        </Link>
        <div className="bg-white p-5"></div>
        <p className="flex items-center gap-2 font-medium text-2xl">
          <Calendar />
          My Events
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {info.map((item) => (
            <div
              className="flex flex-col gap-2 shadow-md py-5 px-4 rounded text-md relative"
              key={item._id}
            >
              <div className="flex justify-between">
                <p>{item.title}</p>
                <p className="text-sm bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                  {new Date(item.date).toISOString().slice(0, 10)}
                </p>
              </div>
              <p className="mt-3 text-md">{item.description}</p>
              <div className="flex items-center gap-2 mt-5">
                <img
                  className="h-7 w-7 object-cover rounded-[50%]"
                  src={
                    item.profilePicture
                      ? `http://localhost:8080${item.profilePicture}`
                      : "https://imgs.search.brave.com/MfCMRjbwpgFuoONjuznH5NyMPYgEXwI4nagKtkUzPOA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODVlNGJmM2NiMTFi/MjI3NDkxYzMzOWEu/cG5n"
                  }
                />
                <p className="text-gray-500 text-sm">
                  Created by {item.created_by}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 mt-5 ml-2">
                  <img
                    className="h-6 w-6 object-cover rounded-[50%]"
                    src={
                      item.profilePicture
                        ? `http://localhost:8080${item.profilePicture}`
                        : "https://imgs.search.brave.com/MfCMRjbwpgFuoONjuznH5NyMPYgEXwI4nagKtkUzPOA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODVlNGJmM2NiMTFi/MjI3NDkxYzMzOWEu/cG5n"
                    }
                  />
                  <p className="text-gray-500 text-sm">
                    {item.participants.length} participants
                  </p>
                </div>
                <MessageCircle className="h-5" />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-10">Unjoined Events:</p>
        {info2.length > 0 ? (
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {info2.map((item) => (
              <div
                className="flex flex-col gap-2 shadow-md py-5 px-4 rounded text-md relative"
                key={item._id}
              >
                <div className="flex justify-between">
                  <p>{item.title}</p>
                  <button
                    onClick={() => {
                      handleJoin(item._id);
                    }}
                    className="text-sm bg-blue-500 px-2 py-1 rounded-full text-white hover:opacity-70 transition-all"
                  >
                    {" "}
                    Join Event
                  </button>
                </div>
                <p className="mt-3 text-md">{item.description}</p>
                <div className="flex items-center gap-2 mt-5">
                  <img
                    className="h-7 w-7 object-cover rounded-[50%]"
                    src={
                      item.profilePicture
                        ? `http://localhost:8080${item.profilePicture}`
                        : "https://imgs.search.brave.com/MfCMRjbwpgFuoONjuznH5NyMPYgEXwI4nagKtkUzPOA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODVlNGJmM2NiMTFi/MjI3NDkxYzMzOWEu/cG5n"
                    }
                  />
                  <p className="text-gray-500 text-sm">
                    Created by {item.created_by}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 mt-5 ml-2">
                    <img
                      className="h-6 w-6 object-cover rounded-[50%]"
                      src={
                        item.profilePicture
                          ? `http://localhost:8080${item.profilePicture}`
                          : "https://imgs.search.brave.com/MfCMRjbwpgFuoONjuznH5NyMPYgEXwI4nagKtkUzPOA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODVlNGJmM2NiMTFi/MjI3NDkxYzMzOWEu/cG5n"
                      }
                    />
                    <p className="text-gray-500 text-sm">
                      {item.participants.length} participants
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm mt-2 ml-3 text-gray-500">No Events Available</p>
        )}
        {open ? <CreateEvent onToggle={handleModel} /> : null}
      </div>
    </Layout>
  );
};

export default EventPage;
