import React, { useEffect, useState } from "react";
import axios from "axios";
import "./uploadForm.css"; // Import the CSS file
import { useSelector } from "react-redux";
import { useStatusUpdateMutation } from "../../Services/userServices";
import { toast } from "react-toastify";

const UploadForm = (props) => {
  const { formName, userId, fieldName, buttonId } = props;
  const initialState = useSelector((state) => state.user);

  const [pdf, setPdf] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [customFileName, setCustomFileName] = useState(); // State for custom file name
  const [savedFileName, setSavedFileName] = useState(); // State for saved file name

  const [updateUser] = useStatusUpdateMutation();

  const allowUpload= initialState.userType==='admin' || initialState.userType==='co-admin';

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
        let url = "";
        if (uploadedUrl !== "") {
          if (formName == "user") {
            url = `http://127.0.0.1:8000/api/${formName}/${userId}/update/`;
            const res = await axios.patch(
              url,
              { [fieldName]: uploadedUrl, title_of_thesis: customFileName },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (res.status === 200) {
              toast.success("Thesis and Thesis Title uploaded successfully to database");
              setSavedFileName(customFileName);
            }
            else
            {
              toast.error("Thesis and Thesis Title failed to upload to database");
              }
          }
          else {
            url = `http://127.0.0.1:8000/api/${formName}/user/${userId}/`;
            const res = await axios.post(
              url,
              { [fieldName]: uploadedUrl },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ).then(async (res) => {
              setDownloadUrl(uploadedUrl);
              // alert("I am here")
              if (formName === "form1B" && res.status === 200) {
                // Update status to "Registered" if form submission is successful
                await updateUser({ id: userId, status: "Registered" }).unwrap();
                // alert("Reg")
              } else if (formName === "form3C" && res.status === 200) {
                // alert("Syn")
                await updateUser({ id: userId, status: "Synopsis" }).unwrap();
              } else if (formName === "form4E" && res.status === 200) {

                await updateUser({
                  id: userId,
                  status: "Thesis Submitted",
                }).unwrap();
              } else if (formName === "form5" && res.status === 200) {
                await updateUser({ id: userId, status: "Defence" }).unwrap();
              } else if (formName === "form6" && res.status === 200) {
                await updateUser({ id: userId, status: "Defence Closed" }).unwrap();
              }
            });
          }
          // console.log(res);
          
        }
      }
    };

    updateUploadedURL();
  }, [uploadedUrl]);

  useEffect(() => {
    const getDownloadURL = async () => {
      const token = sessionStorage.getItem("access");
      if (!token) {
        console.error("No access token found in session storage");
        return;
      }
      let url = "";
      if (formName === "user")
        url = `http://127.0.0.1:8000/api/${formName}/${userId}/`;
      else url = `http://127.0.0.1:8000/api/${formName}/user/${userId}/`;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let fetched_url;
      // console.log(res.data.data);
      if (fieldName === "softcopy_url")
        fetched_url = await res.data.data.softcopy_url;
      else fetched_url = await res.data.data.thesis_url;
      if (!fetched_url) {
        setDownloadUrl("");
      } else {
        setDownloadUrl(fetched_url);
      }
      if (formName === 'user' && res.data.data.title_of_thesis) {
        setSavedFileName(res.data.data.title_of_thesis)
      }
    };

    getDownloadURL();
    // console.log(initialState.isAdmin);
  }, []);

  const handleUpload = async () => {
    if (!pdf) {
      alert("Please select a PDF to upload.");
      return;
    }
    if (formName === 'user' && !customFileName) {
      toast.error("Please enter title of the thesis");
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
      toast.success("Upload Successfull !");
    } catch (error) {
      console.error("Error uploading PDF:", error);
      alert("Failed to upload PDF. See console for details.");
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = (e) => {
    if (!downloadUrl) {
      alert("No PDF uploaded yet.");
      return;
    }

    window.open(downloadUrl, "_blank");
    e.preventDefault();
  };

  return (
    <div className="">
      {allowUpload && (
        <h2 className="title">
          {!downloadUrl ? `Upload` : `Download`} {fieldName === "thesis_url" ? `Thesis` : `Form`}
        </h2>
      )}
      {allowUpload && !downloadUrl && (
        <div className="file-input">
          <label htmlFor={buttonId} className="choose-file-label">
            Choose File
          </label>
          <input
            type="file"
            id={buttonId} // Add an id to the input
            onChange={handlePdfChange}
          />
          {fileName && <span className="file-name">{fileName}</span>}{" "}
          {/* Show the file name */}
        </div>
      )}
      {allowUpload && pdf && !downloadUrl && formName === 'user' && (
        <div className="file-input">
          <label htmlFor="custom-file-name" className="w-full ml-5 px-4 py-3 text-gray-800 font-medium">
          Thesis Title
          </label>
          <input
            type="text"
            id="custom-file-name"
            className="w-full px-4 py-3 border rounded ml-2"
            value={customFileName}
            onChange={(e) => setCustomFileName(e.target.value)}
          />
        </div>
      )}
      {allowUpload && !downloadUrl && (
        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`upload-button ${uploading ? "disabled" : ""}`}
        >
          {uploading ? "Uploading..." : "Upload PDF"}
        </button>
      )}
      {formName === 'user' && savedFileName && (
        <p className="text-gray-800 font-medium mt-1">
          Thesis Title : {savedFileName}
        </p>
      )}
      {downloadUrl ? (
        <div>
          <button onClick={handleDownload} className="download-button">
            Download PDF
          </button>
        </div>
      ) : <div>Form has not been uploaded</div>}
    </div>
  );
};

export default UploadForm;
