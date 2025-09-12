import { createContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const AuthParam = createContext({});

export const AuthProvider = ({ children }) => {
  return <AuthParam.Provider value={{}}>{children}</AuthParam.Provider>;
};

AuthProvider.propTypes = {
  children: AnalyserNode,
};

export default AuthProvider;
