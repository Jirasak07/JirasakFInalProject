import axios from "axios";
import { MDBInput } from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MDBBtn, MDBModalFooter } from "mdb-react-ui-kit";
import Swal from "sweetalert2";

function ModalEditAgency(props) {
  const [inputs, setInputs] = useState({});
  const [selectagen, setSelectAgen] = useState([]);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  useEffect(() => {
    axios
      .post("http://localhost:3333/show-agen-edit", {
        sub_aid: props.sub_aid,
        main_aid: props.main_aid,
      })
      .then((res) => {
        setInputs({
          sub_aname: res.data[0].sub_aname,
          main_aid: props.main_aid,
        });
      });
    axios.get("http://localhost:3333/show-main-agen-select").then((res) => {
      setSelectAgen(res.data);
    });
  }, [props.sub_aid]);
  const onSubmit = (e) => {
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
          .put("http://localhost:3333/agen-edited", {
            sub_aname: inputs.sub_aname,
            main_aid: inputs.main_aid,
            sub_aid: props.sub_aid,
            main_aid_props: props.main_aid,
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
                props.toggleShow();
              window.location.reload(false);
            });
          });
      } else {
        Swal.fire("ยกเลิกการเพิ่มหน่วยงาน", "", "error");
        
      }
    });
  };
  const Cancel=()=>{
    axios
      .post("http://localhost:3333/show-agen-edit", {
        sub_aid: props.sub_aid,
        main_aid: props.main_aid,
      })
      .then((res) => {
        setInputs({
          sub_aname: res.data[0].sub_aname,
          main_aid: props.main_aid,
        });
      });
    props.toggleShow()
  }
  return (
    <>
      <div className="content">
        <form className="d-flex edit">
          <FormControl fullWidth size="small">
            <InputLabel>หน่วยงานหลัก</InputLabel>
            <Select
              label="หน่วยงานหลัก"
              name="main_aid"
              id="demo-simple-select-filled"
              value={inputs.main_aid || ""}
              onChange={handleChange}
            >
              {selectagen.map((item, index) => (
                <MenuItem key={index} value={item.main_aid}>
                  {item.main_aname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <MDBInput
            label="หน่วยงานย่อย"
            name="sub_aname"
            id="demo-simple-select-filled"
            value={inputs.sub_aname || ""}
            onChange={handleChange}
          />
        </form>
      </div>
      <MDBModalFooter>
        <MDBBtn className="btn-success" onClick={onSubmit}>
          บันทึก
        </MDBBtn>
        <MDBBtn className="btn-danger" onClick={Cancel}>
          ยกเลิก
        </MDBBtn>
      </MDBModalFooter>
    </>
  );
}

export default ModalEditAgency;
