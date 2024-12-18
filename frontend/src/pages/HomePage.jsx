import React from "react";
import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";

const HomePage = () => {
  // window.location.href = "/event";
  return (
    <Layout>
      <button className="bg-red-500 p-2 text-white rounded mt-2 ml-2 hover:opacity-80 transition-all">
        SUBSCRIBE
      </button>
      <br />
      EYES BLUE BROWN, CAN'T REMEMBER A LOT OF TIME HAS PASSED SINCE 3RD OF
      DECEMBER
    </Layout>
  );
};

export default HomePage;
