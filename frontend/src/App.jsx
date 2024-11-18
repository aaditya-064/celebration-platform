// import io from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/Auth/SignUp";
import HomePage from "./pages/HomePage";
import Login from "./pages/Auth/Login";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";
import CreateEvent from "./components/CreateEvent";
import EventPage from "./pages/EventPage";
import FamilyPage from "./pages/FamilyPage";
import PhotosPage from "./pages/PhotosPage";

// const socket = io.connect("http://localhost:8080");

function App() {
  // const [room, setRoom] = useState("");
  // const [message, setMessage] = useState("");
  // const [receivedMessage, setReceivedMessage] = useState();
  // const sendMessage = () => {
  //   socket.emit("send_message", { room, message });
  //   console.log(message);
  // };

  // const joinRoom = () => {
  //   if (room !== "") {
  //     socket.emit("join_room", { room });
  //     console.log(room);
  //   }
  // };

  // const handleChange = (e) => {
  //   const { value } = e.target;
  //   setMessage(value);
  // };

  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     setReceivedMessage(data.message);
  //     console.log(data.message);
  //   });
  //   return () => {
  //     return socket;
  //   };
  // }, [socket]);

  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path={"/register"} Component={SignUp} />
          <Route path={"/login"} Component={Login} />
          <Route Component={PrivateRoute}>
            <Route path={"/"} Component={HomePage} />
            <Route path={"/create-event"} Component={CreateEvent} />
            <Route path={"/event"} Component={EventPage} />
            <Route path={"/family"} Component={FamilyPage} />
            <Route path={"/photos"} Component={PhotosPage} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
