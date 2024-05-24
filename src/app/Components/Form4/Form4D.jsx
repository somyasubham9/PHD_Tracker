import React, { useEffect, useState } from "react";
import { useForm4DSubmitMutation } from "../../Services/formService";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLazyGetUserProfileQuery } from "../../Services/userServices";
import UploadForm from "../UploadForm/uploadForm";

const Form4D = ({  userId }) => {
  const initialState = useSelector((state) => state.user);

  if (!userId) {
    userId = initialState.userId;
  }
  const [getUserProfile, { data: userProfile, isLoading, isSuccess }] = useLazyGetUserProfileQuery();

  const [isForm4cSubmitted, setIsForm4cSubmitted] = useState(false);


  useEffect(() => {
    if ( isSuccess && userProfile) {
      const form4cDate = userProfile.data.form4c_submitted;
      if (form4cDate) {
        const date = new Date(form4cDate);
        if (!isNaN(date.getTime())) {
          setIsForm4cSubmitted(true);
        }
      }
    }
  }, [userProfile, isSuccess]);

  useEffect(() => {
    if (userId) {
      getUserProfile(userId);
    }
  }, [userId, getUserProfile]);




  if ( !isForm4cSubmitted) {
    return <div>Form 4C must be submitted before you can access Form 4D.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <form
        className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-700">
          FORM 4(D)
        </h2>
        <UploadForm formName='form4D' userId={userId} fieldName='softcopy_url' buttonId='f4d_upload' />
      </form>
    </div>
  );
};

export default Form4D;
