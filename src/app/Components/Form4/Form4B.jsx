import React, { useEffect, useState } from "react";
import { useForm4BSubmitMutation } from "../../Services/formService";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLazyGetUserProfileQuery } from "../../Services/userServices";
import UploadForm from "../UploadForm/uploadForm";
import { toast } from "react-toastify";

const Form4B = ({  userId }) => {
  const initialState = useSelector((state) => state.user);
  if (!userId) {
    userId = initialState.userId;
  }
  const [getUserProfile, { data: userProfile, isLoading, isSuccess }] =
    useLazyGetUserProfileQuery();

  const [isForm4aSubmitted, setIsForm4aSubmitted] = useState(false);

  useEffect(() => {
    if (isSuccess && userProfile) {
      const form4aDate = userProfile.data.form4a_submitted;
      if (form4aDate) {
        const date = new Date(form4aDate);
        if (!isNaN(date.getTime())) {
          setIsForm4aSubmitted(true);
        }
      }
    }
  }, [userProfile, isSuccess]);

  useEffect(() => {
    if (userId) {
      getUserProfile(userId);
    }
  }, [userId, getUserProfile]);

  if (!isForm4aSubmitted) {
    return <div>Form 4A must be submitted before you can access Form 4B.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <form
        className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6"
      >
        <h2 className="text-center text-2xl font-bold text-gray-700">FORM 4(B)</h2>
        <UploadForm
          formName="form4B"
          userId={userId}
          fieldName="softcopy_url"
          buttonId="f4b_upload"
        />
      </form>
    </div>
  );
};

export default Form4B;
