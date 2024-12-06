import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MessageSquare, Send, Users } from "lucide-react";
import toast from "react-hot-toast";
import io from "socket.io-client";
import Layout from "../components/Layout/Layout";
import axios from "axios";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [eventParticipants, setEventParticipants] = useState([]);
  const url = "http://localhost:8080";

  const userData = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    fetchEventDetails();
    fetchMessages();
    const newSocket = io(url, {
      auth: { token: localStorage.getItem("token") },
    });

    newSocket.on("connect", () => {
      try {
        console.log("Connected to socket");
        newSocket.emit("join-event", { eventId: id });
      } catch (err) {
        console.log(err);
      }
    });

    newSocket.on("new-message", (message) => {
      // console.log("message", message);

      setMessages((prev) => [
        ...prev,
        {
          _id: new Date().getTime(),
          message: message.message,
          createdAt: new Date(),
          senderId: {
            name: userData.name,
            profilePicture: userData.profilePicture,
          },
        },
      ]);
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const response = await axios({
        url: `${url}/api/v1/event/get`,
        method: "get",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setEvent(response.data[0]);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch event Details");
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios({
        url: `${url}/api/v1/event/${id}/messages`,
        method: "get",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setMessages(response.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch messages");
    }
  };

  const participants = async () => {
    try {
      const data = await axios({
        url: `${url}/api/v1/event/participants/${event._id}`,
        method: "get",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setEventParticipants(data.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch this");
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(newMessage);
    if (!newMessage.trim()) return;

    socket.emit("send-message", { eventId: id, message: newMessage });
    setNewMessage("");
  };

  // console.log(messages);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
          <p className="text-gray-600 mb-2">
            {new Date(event.date).toLocaleString()}
          </p>
          <p className="text-gray-700 mb-4">{event.description}</p>

          <div className="flex items-center space-x-2 relative">
            <Users className="w-5 h-5 text-gray-500" />
            <button
              onMouseOver={() => {
                setHovered(true);
                participants();
              }}
              onMouseOut={() => {
                setHovered(false);
              }}
              className="text-gray-600"
            >
              {event.participants?.length} Participants
            </button>
            {hovered ? (
              <div className="absolute left-[15%] shadow-xl py-4 px-4 rounded border">
                <div className="flex flex-col">
                  {eventParticipants.map((item, index) => (
                    <div key={item._id} className="">
                      <p className="text-sm text-black">
                        {index + 1}. {item.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Chat
          </h2>

          <div className="h-96 overflow-y-auto mb-4 space-y-4">
            {messages.map((message) => (
              <div key={message._id} className="flex space-x-3">
                <div className="flex-shrink-0">
                  {message?.senderId?.profilePicture ? (
                    <img
                      src={`http://localhost:8080${message.senderId.profilePicture}`}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200" />
                  )}
                </div>
                <div>
                  <div className="font-medium">{message.senderId.name}</div>
                  <div className="text-gray-700">{message.message}</div>
                  <div className="text-gray-500 text-sm">
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 p-2 border rounded-md"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetails;
