import axios from "axios";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from "mdb-react-ui-kit";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MDBDataTable } from "mdbreact";
import React, { useEffect, useState } from "react";
import "./agen.css";
// sweet alert
import Swal from "sweetalert2";
import ModalEditAgency from "./ModalEditAgency";
//end sweet
function ShowAgency() {
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);
  const [agency, setAgency] = useState([]);
  const [inputs, setInputs] = useState({});
  const [data, setData] = useState([]);
  const [sub_aid, setSub] = useState(0);
  const [mid, setMain] = useState(0);

  //test sweet alert
  // const ClickTest = () => {
  //   Swal.fire({
  //     customClass: {
  //       confirmButton: 'btn btn-success',
  //       cancelButton: 'btn btn-danger'
  //     },
  //     // title:,
  //     text: "Do you want to continue",
  //     icon: "info",
  //     iconColor:'yellow',
  //     confirmButtonText: "Cool",
  //    buttonsStyling:"red"
  //   }).then((value) => {
  //     alert("good");
  //   });
  // };
  // end test
  //main manage
  const [maxmid, setMaxmid] = useState(0);
  const SubmitMain = (e) => {
    e.preventDefault();
    Swal.fire({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: "false",
      iconColor: "Coral",
      icon: "question",

      title: "ยืนยันที่จะบันทึก ?",
      showCancelButton: true,
      confirmButtonText: "บันทึก",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .post("http://localhost:3333/add-main-agency", {
            main_aid: maxmid,
            main_aname: inputs.main_aname,
          })
          .then((res) => {
            Swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: "บันทึกข้อมูลเสร็จสิ้น",
              showConfirmButton: false,
              timer: 1500,
            }).then((value) => {
              window.location.reload(false);
            });
          });
      } else {
        Swal.fire("ยกเลิกการเพิ่มหน่วยงาน", "", "error");
      }
    });
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    axios.get("http://localhost:3333/maxid-main-agen").then((res) => {
      // console.log(res.data[0].maxid);
      setMaxmid(res.data[0].maxid + 1);
    });
  };
  // sub manage
  const [maxsid, setMaxsid] = useState(0);
  const [selectagen, setSelectAgen] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3333/show-main-agen-select").then((res) => {
      setSelectAgen(res.data);
    });
  }, [maxsid]);
  const SubmitSub = (e) => {
    e.preventDefault();
    Swal.fire({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: "false",
      iconColor: "Coral",
      icon: "question",

      title: "ยืนยันที่จะบันทึก ?",
      showCancelButton: true,
      confirmButtonText: "บันทึก",
      cancelButtonText: "ยกเลิก",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .post("http://localhost:3333/add-sub-agency", {
            sub_aid: maxsid,
            sub_aname: inputs.sub_aname,
            main_aid: inputs.main_aid,
          })
          .then((res) => {
            Swal.fire({
              toast: "true",
              position: "top-end",
              icon: "success",
              title: "บันทึกข้อมูลเสร็จสิ้น",
              showConfirmButton: false,
              timer: 1500,
            }).then((value) => {
              window.location.reload(false);
            });
          });
      } else {
        Swal.fire("ยกเลิกการเพิ่มหน่วยงาน", "", "error");
      }
    });
  };
  const handleChangeSub = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    axios.get("http://localhost:3333/maxid-sub-agen").then((res) => {
      if (res.data[0].maxid == null) {
        setMaxsid(1);
      } else {
        setMaxsid(res.data[0].maxid + 1);
      }
    });
  };

  // end sub agen

  //table
  useEffect(() => {
    axios.get("http://localhost:3333/show-agen").then((res) => {
      // console.log(res.data);
      setData(res.data);
      setAgency({
        columns: [
          {
            label: "หน่วยงานหลัก",
            field: "main_aname",
          },
          {
            label: "หน่วยงานย่อย",
            field: "sub_aname",
          },
          {
            label: "จัดการ",
            field: "manage",
          },
        ],
        rows: [
          ...data.map((item) => ({
            main_aname: <>{item.main_aname}</>,
            sub_aname: <>{item.sub_aname}</>,
            manage: (
              <>
                <div
                  className="btn btn-warning btn-sm"
                  onClick={(e) => handleClick(e, item.sub_aid, item.main_aid)}
                >
                  แก้ไข
                </div>
              </>
            ),
          })),
        ],
      });
    });
  });
  //end table
  const handleClick = (e, id, idmain) => {
    toggleShow(!basicModal);
    setSub(id);
    setMain(idmain);
  };
  return (
    <MDBContainer fluid>
      {/* <MDBBtn onClick={ClickTest}>Test</MDBBtn> */}
      <MDBRow className="manage-agen mt-4">
        <MDBCol sm="12" md="12" lg="6">
          <div className="bg-table-agen">
            <MDBDataTable
              small
              displayEntries={false}
              data={agency}
              className="mx-3"
            />
          </div>
        </MDBCol>
        <MDBCol sm="12" md="12" lg="4">
          <div>
            <div className="bg-manage-agen ">
              <div className="mt-2">เพิ่มหน่วยงานหลัก</div>
              <form className="form-sub mt-2">
                <MDBInput
                  label="ชื่อหน่วยงานหลัก"
                  type="text"
                  value={inputs.main_aname || ""}
                  name="main_aname"
                  onChange={handleChange}
                />
                <div className="d-grid gap-2">
                  <MDBBtn
                    className="btn btn-success btn-sm my-2 "
                    onClick={SubmitMain}
                  >
                    บันทึกข้อมูลหน่วยงานหลัก
                  </MDBBtn>
                </div>
              </form>
            </div>
            <div className="bg-manage-agen my-3">
              {" "}
              <div className="mt-2">เพิ่มหน่วยงานย่อย</div>
              <form action="" className="form-sub mt-2">
                <FormControl fullWidth size="small">
                  <InputLabel>หน่วยงานหลัก</InputLabel>
                  <Select
                    label="หน่วยงานหลัก"
                    name="main_aid"
                    id="demo-simple-select-filled"
                    value={inputs.main_aid || ""}
                    onChange={handleChangeSub}
                  >
                    {selectagen.map((item, index) => (
                      <MenuItem key={index} value={item.main_aid}>
                        {item.main_aname}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <MDBInput
                  label="ชื่อหน่วยงาน"
                  type="text"
                  value={inputs.sub_aname || ""}
                  name="sub_aname"
                  onChange={handleChangeSub}
                />
                <div className="d-grid gap-2">
                  <MDBBtn
                    onClick={SubmitSub}
                    className="text-white"
                    color="secondary"
                    size="sm"
                  >
                    บันทึกข้อมูลหน่วยงานย่อย
                  </MDBBtn>
                </div>
              </form>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
      <div></div>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>แก้ไขข้อมูลหน่วยงาน</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <ModalEditAgency sub_aid={sub_aid} main_aid={mid} toggleShow={toggleShow} />
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </MDBContainer>
  );
}

export default ShowAgency;
