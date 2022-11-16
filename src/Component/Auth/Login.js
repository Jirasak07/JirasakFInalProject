import React, { useState } from "react";
import "./Login.css";
import KPRU from "./LOGO RGB PNG-สำหรับงานนำเสนอแบบดิจิติล.png";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Login() {
  const [loading, setLoading] = useState(false);
  // const [isOpenWarning, openWarning, closeWarning] = useModal(false);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const [input, setInput] = useState({});
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3333/login", {
        username: input.username,
        password: input.password,
      })
      .then((res) => {
        // console.log(res.data.token)
        if (res.data.status === "ok") {
          MySwal.fire({
            html: <i>{res.data.message}</i>,
            icon: "success",
          }).then((value) => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user_id", res.data.userid);
            localStorage.setItem("login", "ok");
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              navigate("/product");
            }, 2000);
          });
          // axios.get("").then((res)=>{
          // localStorage.setItem("token", res.data.token);
          // localStorage.setItem("user_id", res.data.userid);
          // localStorage.setItem("login", "ok");
          // navigate("/product");
          // })
          // console.log("Login success")
          // MySwal.fire({
          //   html: <i>{res.data.message}</i>,
          //   icon: "success",
          // }).then((value) => {

          // });
        } else {
          MySwal.fire({
            // customClass: {
            //   confirmButton: "btn btn-success",
            //   cancelButton: "btn btn-danger",
            // },
            html: <i>{res.data.message}</i>,
            icon: "error",
          });
          // MySwal.fire({
          //   html: <i>{res.data.message}</i>,
          //   icon: "error",
          // });
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <>
      {loading ? (
        <>
          <div className="load">
          <div class="loading">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>
          </div>
        </>
      ) : (
        <>
          <div className="bg-login">
            <div className="frm-login">
              <div className="bg-logo ">
                <div className="d-flex justify-content-center">
                  <img className="mt-4" src={KPRU} width="100px" />
                </div>

                <div className="fw-bold mt-2 ">
                  <div className=" label-logo ">
                    <label>ระบบตรวจสอบครุภัณฑ์</label>
                  </div>
                  <div className=" label-logo ">
                    <label>สำนักส่งเสริมวิชาการและงานทะเบียน</label>
                  </div>
                  <div className=" label-logo ">
                    <label>มหาวิทยาลัยราชภัฏกำแพงเพชร</label>
                  </div>
                </div>
              </div>
              <div className="bg-sign">
                <div className="login-label">
                  <label className="fw-bold">เข้าสู่ระบบ</label>
                </div>
                <div className="frm-group-input mt-2 ">
                  <div className="login-input mx-5">
                    <MDBInput
                      value={input.username || ""}
                      name="username"
                      onChange={handleChange}
                      size="sm"
                      className="mt-1"
                      label="ชื่อผู้ใช้ / username"
                      type="text"
                    />
                    <MDBInput
                      value={input.password || ""}
                      name="password"
                      onChange={handleChange}
                      size="sm"
                      className="mt-2"
                      label="รหัสผ่าน / password"
                      type="password"
                    />
                    <div className="d-grid gap-2 mt-2 ">
                      <MDBBtn color="success" size="sm" onClick={handleSubmit}>
                        เข้าสู่ระบบ
                      </MDBBtn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Login;
