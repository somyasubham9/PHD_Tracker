import React, { useEffect, useState } from "react";
import { useForm4DSubmitMutation } from "../../Services/formService";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLazyGetUserProfileQuery } from "../../Services/userServices";

const Form4D = ({ checkFormSubmission = true, userId }) => {
  const initialState = useSelector((state) => state.user);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [form4dSubmit, form4dSubmitResponse] = useForm4DSubmitMutation();
  const [certifications, setCertifications] = useState({
    noJointPublication: false,
    notSupervisor: false,
    notRelated: false,
  });
  const [getUserProfile, { data: userProfile, isLoading, isSuccess }] = useLazyGetUserProfileQuery();

  const [isForm4cSubmitted, setIsForm4cSubmitted] = useState(false);

  useEffect(() => {
    if (checkFormSubmission && initialState.userId) {
      getUserProfile(initialState.userId);
    }
  }, [initialState.userId, getUserProfile]);

  useEffect(() => {
    if (checkFormSubmission && isSuccess && userProfile) {
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

  useEffect(() => {
    if (userProfile) {
      const { form4d } = userProfile.data;
      console.log(form4d);
      if (form4d) {
         if (form4d.is_accepted) {
          setCertifications({
            noJointPublication: true,
            notSupervisor: true,
            notRelated: true,
          });
        }
      }
    }
  }, [userProfile]);


  const handleChange = (field) => {
    setCertifications((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  useEffect(() => {
    const getForm4DData = async () => {
      const token = sessionStorage.getItem("access");
      if (!token) {
        console.error("No access token found in session storage");
        return;
      }

      try {
        console.log(initialState.userId);
        const res = await axios.get(
          `http://127.0.0.1:8000/api/form4D/user/${initialState.userId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = res.data.data;
        if (data.is_accepted) {
          setCertifications({
            noJointPublication: true,
            notSupervisor: true,
            notRelated: true,
          });
        }

        setIsSubmitted(true);
      } catch (error) {
        // console.error('Error fetching data:', error.response ? error.response.data : error.message);
      }
    };
    getForm4DData();
  }, [initialState.userId, isSubmitted]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const allChecked =
      certifications.noJointPublication &&
      certifications.notSupervisor &&
      certifications.notRelated;
    const formData = {
      is_accepted: allChecked,
    };
    try {
      const response = await form4dSubmit(formData);
      console.log(response);
      setIsSubmitted(true)
    } catch (error) {
      console.error(error);
      alert("Failed to submit form.");
    }
  };

  const allChecked =
    certifications.noJointPublication &&
    certifications.notSupervisor &&
    certifications.notRelated;

  const declarationText = `
    This is to certify that the examiner list submitted by me does not have any conflict of interest. I certify the following:
    - The Examiner does not have joint publication with me.
    - The Examiner was not one of my supervisors.
    - The Examiner is not directly related to me (The term directly related to me includes spouse, children, sister, brother, grandchildren, nephew, niece, grandparents, uncle, aunt, first cousin, son-in-law, daughter-in-law, and nephew, niece, grandniece, grandnephew of supervisor’s wife/husband).
  `;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (checkFormSubmission && !isForm4cSubmitted) {
    return <div>Form 4C must be submitted before you can access Form 4D.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <form
        className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-gray-700">
          Conflict of Interest Form
        </h2>

        <div className="text-sm mb-4">{declarationText}</div>

        <div className="space-y-2">
          <label className="flex items-center">
            <input
            disabled={isSubmitted}
              type="checkbox"
              checked={certifications.noJointPublication}
              onChange={() => handleChange("noJointPublication")}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">
              The Examiner does not have joint publication with me.
            </span>
          </label>
          <label className="flex items-center">
            <input
            disabled={isSubmitted}
              type="checkbox"
              checked={certifications.notSupervisor}
              onChange={() => handleChange("notSupervisor")}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">
              The Examiner was not one of my supervisors.
            </span>
          </label>
          <label className="flex items-center">
            <input
            disabled={isSubmitted}
              type="checkbox"
              checked={certifications.notRelated}
              onChange={() => handleChange("notRelated")}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">
              The Examiner is not directly related to me.
            </span>
          </label>
        </div>

        <div>
          {!isSubmitted && <button
            type="submit"
            disabled={!allChecked}
            className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              allChecked
                ? "bg-blue-500 hover:bg-blue-700"
                : "bg-gray-500 cursor-not-allowed"
            }`}
          >
            Submit
          </button>}
        </div>
      </form>
    </div>
  );
};

export default Form4D;
