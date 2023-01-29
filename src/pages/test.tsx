import React, { useState } from "react";
import Component from "../components/LoginButton";

export default function Login() {
  const [message, setMessage] = useState("Message");
  const [isLoggedIn, setIsLoggedIn] = useState("?");

  const login = async () => {};

  const checkLogin = async () => {};

  const logout = async () => {};

  return (
    <>
      <h1>Login</h1>
      <Component />
    </>
  );
}
