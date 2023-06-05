import React from "react";
import axios from "axios";
import "./style.css";
export default function Login() {


  const API = "https://edison-garage-api.savvycom.xyz/api/auth/local";
  //   const newData = {};
  // Lưu dữ liệu vào localsotrage
  //   const saveData = (data) => {
  //     // let a = localStorage.setItem("data", JSON.stringify(data));
  //     // console.log(a);
  //   };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!email || !password) {
      alert("Please fill in both email and password fields");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    const account = {
      identifier: email,
      password: password,
    };

    getAPI(account);
  };

  function getAPI(data) {
    axios.post(API, data, {
    }).then((res) => {
      // const newData = res.data;
      console.log(res.data);
      localStorage.setItem("data", JSON.stringify(res.data.jwt));
    });
  }


}