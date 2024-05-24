import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLazyGetUserProfileQuery } from "../../Services/userServices";
import UploadForm from "../UploadForm/uploadForm";

const Form3C = ({ userId }) => {
  const initialState = useSelector((state) => state.user);
  if (!userId) {
    userId = initialState.userId;
  }
  const [getUserProfile, { data: userProfile, isLoading, isSuccess }] =
    useLazyGetUserProfileQuery();

  const [isForm3bSubmitted, setIsForm3bSubmitted] = useState(false);

  useEffect(() => {
    if (isSuccess && userProfile) {
      const form3bDate = userProfile.data.form3b_submitted;
      if (form3bDate) {
        const date = new Date(form3bDate);
        if (!isNaN(date.getTime())) {
          setIsForm3bSubmitted(true);
        }
      }
    }
  }, [userProfile, isSuccess]);

  useEffect(() => {
    if (userId) {
      getUserProfile(userId);
    }
  }, [userId, getUserProfile]);

  if (!isForm3bSubmitted) {
    return <div>Form 3B must be submitted before you can access Form 3C.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <form className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6">
        <h2 className="text-center text-2xl text-center font-bold text-gray-700">
          FORM 3(C)
        </h2>
        <UploadForm
          formName="form3C"
          userId={userId}
          fieldName="softcopy_url"
          buttonId="f3c_upload"
        />
      </form>
    </div>
  );
};

export default Form3C;
