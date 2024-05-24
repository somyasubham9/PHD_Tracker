import React, { useEffect, useState } from "react";
import { useForm2SubmitMutation } from "../../Services/formService";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLazyGetUserProfileQuery } from "../../Services/userServices";
import UploadForm from "../UploadForm/uploadForm";
import { toast } from "react-toastify";

const Form2 = ({ userId }) => {
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
    if (userProfile && userProfile.data.form1b_submitted) {
      const form1bDate = new Date(userProfile.data.form1b_submitted);
      const currentDate = new Date();
      const yearDiff = currentDate.getFullYear() - form1bDate.getFullYear();

      if (yearDiff >= 2) {
        setFormVisible(true);
      } else {
        console.log(
          "Form2 cannot be shown yet. The required time since Form1B submission has not elapsed."
        );
      }
    }
  }, [userProfile]);



  return formVisible ? (
    <div className="container mx-auto px-4 py-8">
      <form className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6">
        <h2 className="text-center text-2xl font-bold text-gray-700">FORM 2</h2>

        <UploadForm
          formName="form2"
          userId={userId}
          fieldName="softcopy_url"
          buttonId="f2_upload"
        />
      </form>
    </div>
  ) : (
    <div className="text-center mt-10">
      <h2>
        The eligibility criteria for displaying Form 2 has not been met yet.
      </h2>
    </div>
  );
};

export default Form2;
