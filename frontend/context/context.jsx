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
});

export const StateProvider = ({ children }) => {
  const [info, setInfo] = useState([]);
  const [info2, setInfo2] = useState([]);
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
        data: info,
        headers: { Authorization: `Bearer ${token}` },
      });
      setInfo({ ...info, title: "", date: "", description: "" });
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const handleFormUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", info.image);
      formData.append("description", info.description);
      console.log(info);

      const uploadPhoto = await axios({
        url: "http://localhost:8080/api/v1/photo/upload/photo",
        method: "post",
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setInfo({ ...info, image: "", description: "" });
      console.log(uploadPhoto);
    } catch (err) {
      toast.error(err?.response?.data?.msg);
    }
  };

  const handleFileCon = (e) => {
    const { name, files } = e.target;
    setInfo({ ...info, [name]: files[0] });
  };

  const handleChangeCon = (e) => {
    const { name, value } = e.target;
    setInfo2({ ...info, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const data = await axios({
        url: "http://localhost:8080/api/v1/user/login",
        method: "post",
        data: info,
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
      await axios({
        url: "http://localhost:8080/api/v1/user/register",
        method: "post",
        data: info,
      });
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
      console.log(data.data);
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

  const handleAddCon = async (id) => {
    await axios({
      url: `http://localhost:8080/api/v1/user/add/family/${id}`,
      method: "post",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const handleFilteredData = (value) => {
    const filteredData = users.filter((item) => item.email == value);
    setFilteredData(filteredData);
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
