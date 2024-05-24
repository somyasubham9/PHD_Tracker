import React, { useEffect, useState } from "react";
import { useForm3ASubmitMutation } from "../../Services/formService";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLazyGetUserProfileQuery } from "../../Services/userServices";
import UploadForm from "../UploadForm/uploadForm";
import { toast } from "react-toastify";

const Form3A = ({ checkFormSubmission = true, userId }) => {
  const initialState = useSelector((state) => state.user);
  if (!userId) {
    userId = initialState.userId;
  }

  const [getUserProfile, { data: userProfile, isLoading, isSuccess }] =
    useLazyGetUserProfileQuery();

  const [isForm2Submitted, setIsForm2Submitted] = useState(false);

  useEffect(() => {
    if (userId) {
      getUserProfile(userId);
    }
  }, [userId, getUserProfile]);

  useEffect(() => {
    if (isSuccess && userProfile) {
      const form2Date = userProfile.data.form2_submitted;
      if (form2Date) {
        const date = new Date(form2Date);
        if (!isNaN(date.getTime())) {
          setIsForm2Submitted(true);
        }
      }
    }
  }, [userProfile, isSuccess]);

  if (!isForm2Submitted) {
    return <div>Form 2 must be submitted before you can access Form 3A.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <form className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6">
        <h2 className="text-center text-2xl font-bold text-gray-700">
          FORM 3(A)
        </h2>
        <UploadForm
          formName="form3A"
          userId={userId}
          fieldName="softcopy_url"
          buttonId="f3a_upload"
        />
      </form>
    </div>
  );
};

export default Form3A;
