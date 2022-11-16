import React, { useState } from "react";
import getBase64 from "getbase64data";
function GetBase64() {
  //   const [base64code, setBase64] = useState("");
  const [img, setImg] = useState("")
  const handleImageUpload = async (file) => {
    const base64 = await getBase64.fromFile(file);
    setImg(base64);
    console.log(base64)
  };
  var encodedStringAtoB = 'SGVsbG8gV29ybGQh';
  var decodedStringAtoB = atob(encodedStringAtoB);
  return (
    <div>
      <input
        type="file"
        id="img"
        name="img"
        accept="image/*"
        onChange={(e) => handleImageUpload(e.target.files[0])}
      />

      <img src={img} width="1000px" />
      {decodedStringAtoB}
    </div>
  );
}

export default GetBase64;
