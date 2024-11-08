import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:8080");

function App() {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState();
  const sendMessage = () => {
    socket.emit("send_message", { room, message });
    console.log(message);
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", { room });
      console.log(room);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceivedMessage(data.message);
      console.log(data.message);
    });
    return () => {
      return socket;
    };
  }, [socket]);

  return (
    <div className="App">
      <div>
        <input
          onChange={(e) => {
            setRoom(e.target.value);
          }}
          placeholder="Room Number..."
        />
        <button onClick={() => joinRoom()}>Join Room</button>
      </div>
      <input placeholder="Message..." onChange={(e) => handleChange(e)} />
      <button onClick={() => sendMessage()}>Send Message</button>
      <h1>Message:</h1>
      {receivedMessage}
    </div>
  );
}

export default App;
