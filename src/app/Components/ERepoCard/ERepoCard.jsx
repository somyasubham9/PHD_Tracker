import React from "react";
import "./ERepoCard.css";

const ERepoCard = ({ user }) => {
  const handleDownload = () => {
    if (!user.thesis_url) {
      alert("No PDF uploaded yet.");
      return;
    }

    window.open(user.thesis_url, "_blank");
  };
  return (
    <div className="card-client" onClick={handleDownload}>
      <div className="user-picture">
        <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
        </svg>
      </div>
      <div className="flex flex-col">
        <p className="name-client"> {user.name}</p>
        <p className="flex justify-center">{user.roll_no}</p>
        <p className="">Supervisor : {user.supervisor}</p>
        <p className="">Area Of Research : {user.area_of_research}</p>
      </div>
    </div>
  );
};

export default ERepoCard;
