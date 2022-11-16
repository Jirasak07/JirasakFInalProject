import React,{useEffect, useState} from "react";
import { QRCode } from 'react-qrcode-logo';
import logo from '../Auth/LOGO RGB PNG-สำหรับงานนำเสนอแบบดิจิติล.png' 
import axios from "axios";
function Qr(props) {
  const [cid, setCid] =useState(0)
  const Dowload = () =>{
    const canvas = document.getElementById("qr-gen")
    const pngUrl = canvas
    .toDataURL("image/png")
    .replace("image/png","image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${props.pid}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  useEffect(() => {
    axios.post("http://localhost:3333/maxcid",{
      pid:props.pid
    }).then((res)=>{
      setCid(res.data[0].maxcid)
      console.log(res.data[0].maxcid)
    })
  }, [props.pid])
  return (
    <div>
      <div className="row justify-content-center">
      <QRCode id="qr-gen" value={"http://google.com/"+props.pid+"/"+cid} qrStyle='squares' size={300} logoImage={logo} logoWidth={50}  />
      <button className=" mt-5 btn btn-success" onClick={Dowload} >โหลด QRCode</button>
      </div>
   
   
    </div>
  );
}

export default Qr;
