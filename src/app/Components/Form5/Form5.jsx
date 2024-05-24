import React, { useEffect, useState } from "react";
import { useForm5SubmitMutation } from "../../Services/formService";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  useLazyGetUserProfileQuery,
  useStatusUpdateMutation,
} from "../../Services/userServices";
import UploadForm from "../UploadForm/uploadForm";
import { toast } from "react-toastify";

const Form5 = ({ userId }) => {
  const initialState = useSelector((state) => state.user);
  if (!userId) userId = initialState.userId;

  const [getUserProfile, { data: userProfile, isLoading, isSuccess }] =
    useLazyGetUserProfileQuery();

  useEffect(() => {
    if (userId) {
      getUserProfile(userId);
      console.log(userProfile);
    }
  }, [userId, getUserProfile]);

  return (
    <div className="container mx-auto px-4 py-8">
      {userProfile?.data.comments_by_indian &&
      userProfile?.data.comments_by_foreign ? (
        <form
          className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6"
        >
          <h2 className="text-center text-2xl font-bold text-gray-700">
            FORM 5
          </h2>

          <UploadForm
            formName="form5"
            userId={userId}
            fieldName="softcopy_url"
            buttonId="f5_upload"
          />
        </form>
      ) : (
        <div className="text-center mt-10">
          <h2>
            The eligibility criteria for displaying Form 5 has not been met yet.
          </h2>
        </div>
      )}
    </div>
  );
};

export default Form5;
