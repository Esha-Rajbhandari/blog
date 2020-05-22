import React from "react";
import { Redirect } from "react-router-dom";

const Home = () => {
  if (!localStorage.getItem("token")) return <Redirect to="/api/auth/login" />;
  else return <Redirect to="/api/user/dashboard" />;
};

export default Home;
