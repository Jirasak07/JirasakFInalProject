import { MDBContainer } from "mdb-react-ui-kit";
import { MDBDataTable } from "mdbreact";
import React, { useEffect, useState } from "react";
import "./StyleChecking.css";

function CheckProduct() {
  const [tableCheck, setTableCheck] = useState([]);
  const [last, setLast] = useState(false)
  useEffect(() => {
    setTableCheck({
      columns: [
        {
          label: "หมายเลขครุภัณฑ์",
          field: "pid",
        },
        {
          label: "หมายเลขครุภัณฑ์",
          field: "pid2",
        },
        {
          label: "รายการ",
          field: "pname",
        },
        {
          label: "การตรวจสอบล่าสุด",
          field: "lastYear",
        },
        {
          label: "หน่วยงานที่ติดตั้ง",
          field: "sub_aname",
        },

        {
          label: "สถานะที่ตรวจสอบ",
          field: "pstatus",
        },
        {
          label: "ผู้ตรวจสอบ",
          field: "uname",
        },
        {
          label: "จัดการ",
          field: "manage",
        },
      ],
      rows:[
        {
            manage:<><div className={last? "btn btn-success btn-sm ":"btn btn-danger btn-sm"} >ตรวจสอบครุภัณฑ์</div></>
        }
      ]
    });
  });
  return (
    <>
      <MDBContainer breakpoint="md" className="bg-content mt-5">
        <div className="pt-2 d-flex justify-content-center">
          ตรวจสอบครุภัณฑ์
        </div>
        <MDBDataTable
          className="table"
          responsiveXl
          sortable={false}
          data={tableCheck}
        />
      </MDBContainer>
    </>
  );
}

export default CheckProduct;
