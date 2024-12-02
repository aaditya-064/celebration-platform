import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const StateParam = createContext({
  info: [],
  info2: [],
  users: [],
  filteredData: [],
  open,
  handleSubmitCon: () => {},
  handleChangeCon: () => {},
  handleFormUpload: () => {},
  handleFileCon: () => {},
  handleLogin: () => {},
  handleRegister: () => {},
  handleGetEvents: () => {},
  handleUnjoinedEvents: () => {},
  handleJoinEvent: () => {},
  handleModelCon: () => {},
  getFamilyCon: () => {},
  allUserCon: () => {},
  handleAddCon: () => {},
  handleFilteredData: () => {},
  handleGetPhotos: () => {},
  searchUser: () => {},
  getUserCon: () => {},
  handleRemoveCon: () => {},
});

export const StateProvider = ({ children }) => {
  const [info, setInfo] = useState([]);
  const [info2, setInfo2] = useState([]);
  const [loggedUser, setLoggedUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const token = localStorage.getItem("token");

  const handleSubmitCon = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios({
        url: "http://localhost:8080/api/v1/event/upload",
        method: "post",
        data: info2,
        headers: { Authorization: `Bearer ${token}` },
      });
      setInfo2({ ...info2, title: "", date: "", description: "" });
      window.location.reload();
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const handleFormUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", info2.image);
      formData.append("description", info2.description);
      // console.log(formData);
      const uploadPhoto = await axios({
        url: "http://localhost:8080/api/v1/photo/upload/photo",
        method: "post",
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setInfo2({ ...info2, image: "", description: "" });
      window.location.href = "/photos";
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.msg);
    }
  };

  const handleFileCon = (e) => {
    const { name, files } = e.target;
    setInfo2({ ...info, [name]: files[0] });
  };

  const getUserCon = async () => {
    try {
      const data = await axios({
        url: "http://localhost:8080/api/v1/user/get-user",
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoggedUser(data.data);
    } catch (err) {
      toast.error(err?.response?.data?.msg);
    }
  };

  const handleChangeCon = (e) => {
    const { name, value } = e.target;
    setInfo2({ ...info2, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const data = await axios({
        url: "http://localhost:8080/api/v1/user/login",
        method: "post",
        data: info2,
      });
      const payload = JSON.parse(data.request.response);
      const token = payload.token;
      localStorage.setItem("token", token);
      toast.success(data.data.msg);
      window.location.href = "/";
    } catch (err) {
      toast.error(err?.response?.data?.msg);
    }
  };

  const handleRegister = async () => {
    try {
      // console.log(info2);
      await axios({
        url: "http://localhost:8080/api/v1/user/register",
        method: "post",
        data: info2,
      });
      window.location.href = "/login";
    } catch (err) {
      toast.error(err?.response?.data?.msg);
    }
  };

  const handleGetEvents = async () => {
    try {
      const data = await axios({
        url: "http://localhost:8080/api/v1/event/get",
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
      });
      setInfo(data.data);
    } catch (err) {
      toast.error(err?.response?.data?.msg);
    }
  };

  const handleUnjoinedEvents = async () => {
    try {
      const data = await axios({
        url: "http://localhost:8080/api/v1/event/unjoined-events",
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
      });
      setInfo2(data.data);
      // console.log(data.data);
    } catch (err) {
      toast.error(err?.response?.data?.msg);
    }
  };

  const handleJoinEvent = async (id) => {
    try {
      const data = await axios({
        url: `http://localhost:8080/api/v1/event/${id}/join`,
        method: "post",
        headers: { Authorization: `Bearer ${token}` },
      });
      setInfo2(data.data);
      window.location.reload();
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const handleModelCon = () => {
    setOpen(!open);
  };

  const getFamilyCon = async () => {
    const data = await axios({
      url: "http://localhost:8080/api/v1/user/get/family",
      method: "get",
      headers: { Authorization: `Bearer ${token}` },
    });
    setInfo(data.data);
    try {
    } catch (err) {
      toast.error(err?.response?.data?.msg);
    }
  };

  const allUserCon = async () => {
    const data = await axios({
      url: "http://localhost:8080/api/v1/user/all-user",
      method: "get",
    });
    setUsers(data.data);
    try {
    } catch (err) {
      toast.error(err?.response?.data?.msg);
    }
  };

  const searchUser = async (email) => {
    try {
      const data = await axios({
        url: `http://localhost:8080/api/v1/user/search-user/${email}`,
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
      });
      setFilteredData(data.data);
    } catch (err) {
      toast.error(err?.response?.data?.msg);
    }
  };

  const handleAddCon = async (id) => {
    try {
      await axios({
        url: `http://localhost:8080/api/v1/user/add/family/${id}`,
        method: "post",
        headers: { Authorization: `Bearer ${token}` },
      });
      window.location.reload();
    } catch (err) {
      toast.error(err?.response?.data?.msg);
    }
  };

  const handleFilteredData = (value) => {
    // const all_user = users.filter((item) => item.email != loggedUser.email);
    const filteredData = users.filter((item) => item.email == value);
    // setFilteredData(filteredData);
  };

  const handleGetPhotos = async () => {
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

  const handleRemoveCon = async (id) => {
    try {
      await axios({
        url: `http://localhost:8080/api/v1/user/remove-family/${id}`,
        method: "delete",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      window.location.reload();
    } catch (err) {
      toast.error(err?.response?.data?.msg);
      console.log(err);
    }
  };

  return (
    <StateParam.Provider
      value={{
        info,
        info2,
        users,
        open,
        filteredData,
        handleSubmitCon,
        handleChangeCon,
        handleFormUpload,
        handleFileCon,
        handleLogin,
        handleRegister,
        handleGetEvents,
        handleUnjoinedEvents,
        handleJoinEvent,
        handleModelCon,
        getFamilyCon,
        allUserCon,
        handleAddCon,
        handleFilteredData,
        handleGetPhotos,
        getUserCon,
        searchUser,
        handleRemoveCon,
      }}
    >
      {children}
    </StateParam.Provider>
  );
};

StateProvider.propTypes = {
  children: AnalyserNode,
};

export default StateProvider;
