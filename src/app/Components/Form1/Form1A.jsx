import React, { useEffect, useState } from "react";
import { useForm1ASubmitMutation } from "../../Services/formService";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLazyGetUserProfileQuery } from "../../Services/userServices";
import UploadForm from "../UploadForm/uploadForm";
import { toast } from "react-toastify";

const Form1A = ({ userId }) => {
  const initialState = useSelector((state) => state.user);
  if (!userId) {
    userId = initialState.userId;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <form className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6">
        <h2 className="text-2xl font-bold text-gray-700 text-center">
          FORM 1(A)
        </h2>

        <UploadForm
          formName="form1A"
          userId={userId}
          fieldName="softcopy_url"
          buttonId="f1a_upload"
        />
      </form>
    </div>
  );
};

export default Form1A;
