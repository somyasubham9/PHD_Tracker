import React, { useEffect, useState } from "react";
import { useForm1BSubmitMutation } from "../../Services/formService";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  useLazyGetUserProfileQuery,
  useStatusUpdateMutation,
  useUserUpdateMutation,
} from "../../Services/userServices";
import UploadForm from "../UploadForm/uploadForm";
import { toast } from "react-toastify";

const Form1B = ({ userId }) => {
  const initialState = useSelector((state) => state.user);
  if (!userId) {
    userId = initialState.userId;
  }

  const [getUserProfile, { data: userProfile, isLoading, isSuccess }] =
    useLazyGetUserProfileQuery();

  const [isForm1ASubmitted, setIsForm1ASubmitted] = useState(false);
  
  useEffect(() => {
    if (userId) {
      getUserProfile(userId);
    }
  }, [userId, getUserProfile]);

  useEffect(() => {
    if (isSuccess && userProfile) {
      const form1aDate = userProfile.data.form1a_submitted;
      console.log(userProfile)
      if (form1aDate) {
        const date = new Date(form1aDate);
        if (!isNaN(date.getTime())) {
          setIsForm1ASubmitted(true);
        }
      }
      console.log(isForm1ASubmitted)
    }
  }, [userProfile, isSuccess]);

  if (!isForm1ASubmitted) {
    return <div>Form 1A must be submitted before you can access Form 1B.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <form className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6">
        <h2 className="text-center text-2xl font-bold text-gray-700">
          FORM 1(B)
        </h2>

        <UploadForm
          formName="form1B"
          userId={userId}
          fieldName="softcopy_url"
          buttonId="f1b_upload"
        />
      </form>
    </div>
  );
};

export default Form1B;
