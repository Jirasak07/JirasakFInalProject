import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { FaBars } from "react-icons/fa";
import { GoPrimitiveDot } from "react-icons/go";
import { AiOutlineCaretDown } from "react-icons/ai";
import logo from "./LOGO RGB PNG-สำหรับงานนำเสนอแบบดิจิติล.png";
import { NavLink } from "react-router-dom";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import axios from "axios";

function Navbar() {
  const [uid, setUid] = useState("");
  const id = localStorage.getItem("user_id");
  useEffect(() => {
    axios
      .post("http://localhost:3333/show-user-login", {
        user_id: id,
      })
      .then((res) => {
        setUid(res.data[0].name);
      });
  });
  const navigate = useNavigate();
  const [left, setLeft] = useState(false);
  const showSide = () => {
    setLeft(!left);
  };
  const [d, setD] = useState(false);
  const drop = () => {
    setD(!d);
  };
  const logout = () => {
    localStorage.setItem("token", "");
    setD(!d);
    navigate("/");
  };

  return (
    <>
      <div className="nav">
        <MDBContainer fluid>
          <MDBRow className="align-items-center r">
            <MDBCol size="2" className=" mx-2 left-logo">
              <FaAngleDoubleLeft className="open-icon" onClick={showSide} />
            </MDBCol>
            <MDBCol size="6" className="d-flex justify-content-center  ">
              {" "}
              <NavLink className="title-system" to="/product">
                ระบบตรวจสอบครุภัณฑ์ สำนักส่งเสริมวิชาการและงานทะเบียน
              </NavLink>
            </MDBCol>
            <MDBCol>
              <div className="name-dropdown-group">
                <div>
                  <GoPrimitiveDot className="text-success " /> {uid}
                  <MDBDropdown>
                    <MDBDropdownMenu
                      className="box-dd"
                      alwaysOpen={d ? "false" : ""}
                    >
                      <MDBDropdownItem link href="#">
                        แก้ไขโปรไฟล์
                      </MDBDropdownItem>
                      <MDBDropdownItem
                        link
                        onClick={logout}
                        className="text-logout"
                      >
                        ออกจากระบบ
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </div>
                <div className="mx-2">
                  <AiOutlineCaretDown
                    onClick={drop}
                    className={d ? "dropdown active" : "dropdown "}
                  />
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <div className={left ? "nav-left no " : " nav-left "}>
        <div className=" close-icon d-flex justify-content-end mx-2 ">
          <FaAngleDoubleLeft onClick={showSide} />
        </div>
        <div className="Menu">
          <div>
            <img src={logo} width="100px" />
          </div>
          <NavLink
         exact="true"
            className={(navData) => (navData.isActive ? "active" : "menu-item")}
            to="/product"
          >
            ครุภัณฑ์
          </NavLink>
          <NavLink
           exact="true"
            className={(navData) => (navData.isActive ? "active" : "menu-item")}
            to="/checking"
          >
            ตรวจสอบครุภัณฑ์
          </NavLink>
          <NavLink
       exact="true"
            className={(navData) => (navData.isActive ? "active" : "menu-item")}
            to="/update"
          >
            อัพเดทข้อมูลครุภัณฑ์
          </NavLink>
          <NavLink
          exact="true"
            className={(navData) => (navData.isActive ? "active" : "menu-item")}
            to="/agency"
          >
            จัดการหน่วยงาน
          </NavLink>
          <NavLink
            exact="true"
            className={(navData) => (navData.isActive ? "active" : "menu-item")}
            to="/user"
          >
            จัดการเจ้าหน้าที่
          </NavLink>
          <NavLink
         exact="true"
            className={(navData) => (navData.isActive ? "active" : "menu-item")}
            to="/report"
          >
            ออกรายงานครุภัณฑ์
          </NavLink>
          {/* <div className="menu-item" >menu</div>
      <div className="menu-item" >menu</div>
      <div className="menu-item" >menu</div> */}
        </div>
      </div>
      <div
        onClick={showSide}
        className={left ? "bg-overlay no " : "bg-overlay "}
      ></div>
    </>
  );
}

export default Navbar;
