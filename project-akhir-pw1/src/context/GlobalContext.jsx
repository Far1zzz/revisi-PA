import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { data } from "autoprefixer";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [input, setInput] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [fetch, setFetch] = useState(true);

  useEffect(() => {
    if (fetch === true) {
    }
  }, [fetch, setFetch]);

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    setToken(getToken);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email);
    if (email === "") {
      toast.error("Email is required");
      return;
    }
    if (password === "") {
      toast.error("Password is required");
      return;
    }
    if (email !== "" && password !== "") {
      const data = {
        email,
        password,
      };
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_ADMIN}/auth/login`,
          data
        );
        if (res.data.token) {
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.data));
          setToken(res.data.token);
          navigate("/");
        }
      } catch (err) {
        toast.error("Error");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    navigate("/login");
  };

  let state = {
    input,
    setInput,
    email,
    setEmail,
    password,
    setPassword,
    token,
    setToken,
  };

  let handleFunction = {
    handleLogin,
    handleLogout,
  };

  return (
    <GlobalContext.Provider value={{ state, handleFunction }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
