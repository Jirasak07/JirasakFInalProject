import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ShowAgency from "./Agency/ShowAgency";
import Product from "./Product/Product";
import axios from "axios";
import Login from "./Auth/Login";
import CheckProduct from "../Manage/Check/CheckProduct";
import { useLocation } from "react-router-dom";
import "../App.css";
import TestUpload from "./Report/TestUpload";

function Router() {
  const location = useLocation();
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   fetch("http://localhost:3333/auth", {
  //     method: "POST",
  //     headers: { Authorization: "Bearer " + token },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if(data.status =="ok"){

  //       }else if(location.pathname == '/'){

  //       }else{

  //         window.location='/'

  //       }
  //     });
  // });
  useEffect(() => {
    const token = localStorage.getItem("token");
    const Auth = async () => {
      const data = await fetch("http://localhost:3333/auth", {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "ok") {
          } else if (location.pathname == "/") {
          } else {
            window.location = "/";
          }
        });
    };
    Auth().catch(console.error);
  });
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/agency" element={<ShowAgency />} />
        <Route path="/product" element={<Product />} />
        <Route path="/checking" element={<CheckProduct />} />
        <Route path="/report" element={<TestUpload/>} />
      </Routes>
    </div>
  );
}

export default Router;
