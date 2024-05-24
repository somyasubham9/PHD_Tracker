import React, { useEffect, useState } from "react";
import { useForm6SubmitMutation } from "../../Services/formService";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  useLazyGetUserProfileQuery,
  useStatusUpdateMutation,
} from "../../Services/userServices";
import UploadForm from "../UploadForm/uploadForm";
import { toast } from "react-toastify";

const Form6 = ({ userId }) => {
  const initialState = useSelector((state) => state.user);

  if (!userId) {
    userId = initialState.userId;
  }
  const [getUserProfile, { data: userProfile, isLoading, isSuccess }] = useLazyGetUserProfileQuery();

  const [isForm5Submitted, setIsForm5Submitted] = useState(false);


  useEffect(() => {
    if ( isSuccess && userProfile) {
      const form5Date = userProfile.data.form5_submitted;
      if (form5Date) {
        const date = new Date(form5Date);
        if (!isNaN(date.getTime())) {
          setIsForm5Submitted(true);
        }
      }
    }
  }, [userProfile, isSuccess]);

  useEffect(() => {
    if (userId) {
      getUserProfile(userId);
    }
  }, [userId, getUserProfile]);




  if ( !isForm5Submitted) {
    return <div>Form 5 must be submitted before you can access Form 6.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <form className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6">
        <h2 className="text-2xl font-bold text-gray-700">FORM 6</h2>
        <UploadForm
          formName="form6"
          userId={userId}
          fieldName="softcopy_url"
          buttonId="f6_upload"
        />
      </form>
    </div>
  );
};

export default Form6;
