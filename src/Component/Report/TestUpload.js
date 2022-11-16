import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import GetBase64 from "./GetBase64";


function TestUpload() {
  const [file, setFile] = useState();

  function handleChange(event) {
    setFile(event.target.files[0]);

    console.log(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const url = "http://localhost:3333/upload";
    const formData = new FormData();
    formData.append("photo", file);
    // formData.append("fileName", );
    console.log(file)
    // const config = {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // };
    for (var pair of formData.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }
    axios.post(url, formData).then((response) => {
      console.log(response);
    });
  }
  const im = "สกรีนช็อต_25651025_155835.png"

  return (
    <div className="testform">
      <form  onSubmit={handleSubmit}  encType="multipart/form-data" acceptCharset="UTF-8" >
        <h1>React File Upload</h1>
        <input name="photo" type="file" onChange={handleChange} />
        <button type="submit" >
          Upload
        </button>
      </form>
      <img src="http://localhost:3333/img/Thai.png" alt="image" width="550px" />
    <img src={`http://localhost:3333/img/${im}`} width="550px"  />
      <GetBase64 />
   
    </div>
  );
}

export default TestUpload;
