import React, { useEffect, useState } from "react";
import axios from "axios";
import "./uploadForm.css"; // Import the CSS file
import { useSelector } from "react-redux";

const UploadForm = (props) => {
  const { formName,userId, fieldName } = props;
  const initialState = useSelector((state) => state.user);

  const [pdf, setPdf] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [fileName, setFileName] = useState("");

  const handlePdfChange = (event) => {
    const selectedPdf = event.target.files[0];
    setPdf(selectedPdf);
    setFileName(selectedPdf ? selectedPdf.name : ""); // Update the file name
  };

  useEffect(() => {
    const updateUploadedURL = async () => {
      if (uploadedUrl) {
        const token = sessionStorage.getItem("access");
        if (!token) {
          console.error("No access token found in session storage");
          return;
        }
        let url=''
        if(formName =='user')
            url=`http://127.0.0.1:8000/api/${formName}/${userId}/update/`
        else
            url=`http://127.0.0.1:8000/api/${formName}/user/${userId}/`
        const res = await axios.patch(
          url,
          { [fieldName] :uploadedUrl },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(res);
      }
    };
    updateUploadedURL();
  }, [uploadedUrl]);

  useEffect(()=>{
    const getDownloadURL=async()=>{
        const token = sessionStorage.getItem("access");
        if (!token) {
          console.error("No access token found in session storage");
          return;
        }
        let url=''
        if(formName ==='user')
            url=`http://127.0.0.1:8000/api/${formName}/${userId}/`
        else
            url=`http://127.0.0.1:8000/api/${formName}/user/${userId}/`
        const res = await axios.get(
            url,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          let fetched_url;
          console.log(res.data.data)
          if(fieldName==='softcopy_url')
            fetched_url=await res.data.data.softcopy_url;
          else
            fetched_url=await res.data.data.thesis_url;
        if(!fetched_url){
            setUploadedUrl('');
        }
        else{
        setUploadedUrl(fetched_url);
        }
    }
    
    getDownloadURL();
    console.log(initialState.isAdmin);
  },[])

  const handleUpload = async () => {
    if (!pdf) {
      alert("Please select a PDF to upload.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", pdf);
    formData.append("upload_preset", "ml_default"); // Replace with your Cloudinary upload preset
    formData.append("cloud_name", "dqn5lkgj7");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dqn5lkgj7/upload`, // Your Cloudinary cloud name
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadedUrl(response.data.secure_url);
      alert("PDF uploaded successfully!");
    } catch (error) {
      console.error("Error uploading PDF:", error);
      alert("Failed to upload PDF. See console for details.");
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = () => {
    if (!uploadedUrl) {
      alert("No PDF uploaded yet.");
      return;
    }

    window.open(uploadedUrl, "_blank");
  };

  return (
    <div className="container">
      {initialState.isAdmin && <h2 className="title">{fieldName==='thesis_url' ? `Upload Thesis` : `Upload Form`}</h2>}
      {initialState.isAdmin && <div className="file-input">
        <label htmlFor="pdf-upload" className="choose-file-label">
          Choose File
        </label>
        <input
          type="file"
          id="pdf-upload" // Add an id to the input
          onChange={handlePdfChange}
        />
        {fileName && <span className="file-name">{fileName}</span>}{" "}
        {/* Show the file name */}
      </div>}
      {initialState.isAdmin && <button
        onClick={handleUpload}
        disabled={uploading}
        className={`upload-button ${uploading ? "disabled" : ""}`}
      >
        {uploading ? "Uploading..." : "Upload PDF"}
      </button>}
      {uploadedUrl && (
        <div>
          <button onClick={handleDownload} className="download-button">
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
