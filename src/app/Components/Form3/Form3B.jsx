import React, { useEffect, useState } from 'react';
import { useForm3BSubmitMutation } from '../../Services/formService';
import { useSelector } from "react-redux";
import axios from "axios";
import { useLazyGetUserProfileQuery } from '../../Services/userServices';
import UploadForm from '../UploadForm/uploadForm';


const Form3B = ({userId}) => {
  const initialState = useSelector((state) => state.user);
  if (!userId) {
    userId = initialState.userId;
  }

  const [getUserProfile, { data: userProfile, isLoading, isSuccess }] = useLazyGetUserProfileQuery();

  const [isForm3aSubmitted, setIsForm3aSubmitted] = useState(false);


  useEffect(() => {
    if (isSuccess && userProfile) {
      const form3aDate = userProfile.data.form3a_submitted;
      if (form3aDate) {
        const date = new Date(form3aDate);
        if (!isNaN(date.getTime())) {
          setIsForm3aSubmitted(true);
        }
      }
    }
  }, [userProfile, isSuccess]);

  useEffect(() => {
    if (userId) {
      getUserProfile(userId);
    }
  }, [userId, getUserProfile]);

  if ( !isForm3aSubmitted) {
    return <div>Form 3A must be submitted before you can access Form 3B.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <form className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6" >
        <h2 className="text-center text-2xl font-bold text-gray-700">FORM 3(B)</h2>

        <UploadForm formName='form3B' userId={userId} fieldName='softcopy_url' buttonId='f3b_upload' />
      </form>
    </div>
  );
}

export default Form3B;
