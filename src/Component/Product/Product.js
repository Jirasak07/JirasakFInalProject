import { MDBContainer } from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import "./Product.css";
import { MDBDataTable, MDBRow, MDBCol } from "mdbreact";
import { GoPrimitiveDot } from "react-icons/go";
import axios from "axios";
import Qr from "./Qr";

import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

function Product() {
  const showDetail = (id) => {
    alert(id);
  };
  const handleClickz = (idx) => {
    setId(idx);
    
    toggleQ();
  };
  const [qrc, setQrc] = useState(false);
  const toggleQ = () => setQrc(!qrc);
  const [id, setId] = useState(0);
  useEffect(() => {
    axios.get("http://localhost:3333/product").then((res) => {
      setData(res.data);
      setTable({
        columns: [
          {
            label: "หมายเลขครุภัณฑ์",
            field: "pid",
          },
          {
            label: "รายการ",
            field: "pname",
          },
          {
            label: "หน่วยงาน",
            field: "sub_aname",
          },
          {
            label: "จำนวน",
            field: "qty",
          },
          {
            label: "สถานะ",
            field: "pstatus",
          },
          {
            label: "การจัดการ",
            field: "manage",
          },
        ],
        rows: [
          ...data.map((item) => ({
            pid: (
              <div
                className="cursor-pointer"
                onClick={(e) => showDetail(item.pid)}
              >
                {item.pid}
              </div>
            ),
            pname: (
              <div onClick={(e) => showDetail(item.pid)}>{item.pname}</div>
            ),
            sub_aname: (
              <div onClick={(e) => showDetail(item.pid)}>{item.sub_aname}</div>
            ),
            qty: <div onClick={(e) => showDetail(item.pid)}>{item.qty}</div>,
            pstatus: (
              <div onClick={(e) => showDetail(item.pid)}>{item.pstatus_id}</div>
            ),
            manage: (
              <MDBRow>
                <MDBCol size="4">
                  <div className="btn btn-warning btn-sm ">แก้ไข</div>
                </MDBCol>
                <MDBCol>
                  <div className="btn btn-secondary text-white btn-sm "  onClick={(e) => handleClickz(item.pid)}>
                    QR COde
                  </div>
                </MDBCol>
              </MDBRow>
            ),
          })),
        ],
      });
    });
  });
  const [data, setData] = useState([]);
  const [table, setTable] = useState([]);
  return (
    <>
      <MDBContainer className="bg-content mt-5">
        <div className="pt-2 d-flex justify-content-between">
          <div>
            <div className="btn btn-success btn-sm mx-2 ">
              เพิ่มครุภัณฑ์เดี่ยว
            </div>
            <div className="btn btn-info btn-sm ">เพิ่มครุภัณฑ์เดี่ยว</div>
          </div>
          <div className="fs-5 mx-5">
            <GoPrimitiveDot className="text-danger " />
            <GoPrimitiveDot className="text-warning " />
            <GoPrimitiveDot className="text-success " />
          </div>
        </div>

        <div>
          <MDBDataTable
            sortable={false}
            responsiveXl
            small
            // scrollX
            // maxHeight="500px"
            data={table}
            displayEntries={false}
            striped
            hover
          />
        </div>
      </MDBContainer>
      <div className="pb-5"></div>
      <MDBModal show={qrc} setShow={setQrc} tabIndex="-1">
          <MDBModalDialog centered size="lg">
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>QRCode ครุภัณฑ์หมายเลข : {id}</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleQ}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <Qr pid={id}  />
              </MDBModalBody>
              <MDBModalFooter>
                <div className="btn btn-danger" onClick={toggleQ}>
                  Cancel
                </div>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
    </>
  );
}

export default Product;
