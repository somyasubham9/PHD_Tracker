import React, { useEffect, useState } from "react";
import {
  useForm4CSubmitMutation,
  useLazyGetExaminerProfileQuery,
} from "../../Services/formService";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLazyGetUserProfileQuery } from "../../Services/userServices";
import UploadForm from "../UploadForm/uploadForm";
import { toast } from "react-toastify";

const Form4C = ({ checkFormSubmission = true, userId }) => {
  const initialState = useSelector((state) => state.user);
  if (!userId) {
    userId = initialState.userId;
  }
  const [getUserProfile, { data: userProfile, isLoading, isSuccess }] =
    useLazyGetUserProfileQuery();

  const [isForm4bSubmitted, setIsForm4bSubmitted] = useState(false);

  useEffect(() => {
    if (isSuccess && userProfile) {
      const form4bDate = userProfile.data.form4b_submitted;
      if (form4bDate) {
        const date = new Date(form4bDate);
        if (!isNaN(date.getTime())) {
          setIsForm4bSubmitted(true);
        }
      }
    }
  }, [userProfile, isSuccess]);

  useEffect(() => {
    if (userId) {
      getUserProfile(userId);
    }
  }, [userId, getUserProfile]);

  if (!isForm4bSubmitted) {
    return <div>Form 4B must be submitted before you can access Form 4C.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <form
        className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6"
      >
        <h2 className="text -center text-2xl font-bold text-gray-700">
          FORM 4(C)
        </h2>
        <UploadForm
          formName="form4C"
          userId={userId}
          fieldName="softcopy_url"
          buttonId="f4c_upload"
        />
      </form>
    </div>
  );
};

export default Form4C;
