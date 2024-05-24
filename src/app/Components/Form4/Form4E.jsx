import React, { useEffect, useState } from "react";
import { useForm4ESubmitMutation } from "../../Services/formService";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  useLazyGetUserProfileQuery,
  useStatusUpdateMutation,
} from "../../Services/userServices";
import UploadForm from "../UploadForm/uploadForm";

const Form4E = ({ checkFormSubmission = true, userId }) => {
  const initialState = useSelector((state) => state.user);
  if (!userId) {
    userId = initialState.userId;
  }

  const [getUserProfile, { data: userProfile, isLoading, isSuccess }] =
    useLazyGetUserProfileQuery();

  const [isForm4dSubmitted, setIsForm4dSubmitted] = useState(false);

  useEffect(() => {
    if (checkFormSubmission && isSuccess && userProfile) {
      const form4dDate = userProfile.data.form4d_submitted;
      if (form4dDate) {
        const date = new Date(form4dDate);
        if (!isNaN(date.getTime())) {
          setIsForm4dSubmitted(true);
        }
      }
    }
  }, [userProfile, isSuccess]);

  useEffect(() => {
    if (userId) {
      getUserProfile(userId);
      console.log(userProfile)
    }
  }, [userId, getUserProfile]);

  if (!isForm4dSubmitted) {
    return <div>Form 4D must be submitted before you can access Form 4E.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <form
        className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6"
      >
        <h2 className="text-center text-2xl font-bold text-gray-700">
          FORM 4(E)
        </h2>

        <UploadForm
          formName="form4E"
          userId={userId}
          fieldName="softcopy_url"
          buttonId="f4e_upload"
        />
      </form>
    </div>
  );
};

export default Form4E;
