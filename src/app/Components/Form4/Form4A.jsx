import React, { useEffect, useState } from "react";
import { useLazyGetUserProfileQuery } from "../../Services/userServices";
import { useSelector } from "react-redux";
import UploadForm from "../UploadForm/uploadForm";
import axios from "axios";

const Form4A = ({userId}) => {
  const initialState = useSelector((state) => state.user);
  if (!userId) {
    userId = initialState.userId;
  }

  const [formVisible, setFormVisible] = useState(false);
  const [getUserProfile, { data: userProfile }] = useLazyGetUserProfileQuery();


  useEffect(() => {
    if (userId) {
      getUserProfile(userId);
    }
  }, [userId, getUserProfile]);



  useEffect(() => {
    if (userProfile && userProfile.data.form3c_submitted) {
      const form3cDate = new Date(userProfile.data.form3c_submitted);
      const currentDate = new Date();
      const yearDiff = currentDate.getFullYear() - form3cDate.getFullYear();
      const monthDiff =
        currentDate.getMonth() - form3cDate.getMonth() + yearDiff * 12;

      if (monthDiff >= 3) {
        setFormVisible(true);
      } else {
        console.log(
          "Form4 cannot be shown yet. The required time since Form1B submission has not elapsed."
        );
      }
    }
  }, [userProfile]);

  return formVisible ? (
    <div className="container mx-auto px-4 py-8">
      <form className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6">
        <h2 className="text-center text-2xl font-bold text-gray-700">FORM 4(A)</h2>
        <UploadForm
          formName="form4A"
          userId={userId}
          fieldName="softcopy_url"
          buttonId="f4a_upload"
        />
      </form>
    </div>
  ) : (
    <div className="text-center mt-10">
      <h2>
        The eligibility criteria for displaying Form 4 has not been met yet.
      </h2>
    </div>
  );
};

export default Form4A;
