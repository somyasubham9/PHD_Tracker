import React, { useEffect, useState } from "react";
import { useForm4ESubmitMutation } from "../../Services/formService";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLazyGetUserProfileQuery, useStatusUpdateMutation } from "../../Services/userServices";
import UploadForm from "../UploadForm/uploadForm";
import { toast } from "react-toastify";

const Form4E = ({ checkFormSubmission = true, userId }) => {
  const initialState = useSelector((state) => state.user);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [updateUser] = useStatusUpdateMutation();
  const [form4eSubmit, form4eSubmitResponse] = useForm4ESubmitMutation();
  const [manuscriptDetails, setManuscriptDetails] = useState({
    name_of_author: "",
    title_of_manuscript: "",
    conference_name: "",
    year_of_publications: "",
  });
  const [isAgreed, setIsAgreed] = useState(false);

  const [getUserProfile, { data: userProfile, isLoading, isSuccess }] = useLazyGetUserProfileQuery();

  const [isForm4dSubmitted, setIsForm4dSubmitted] = useState(false);

  useEffect(() => {
    if (checkFormSubmission && initialState.userId) {
      getUserProfile(initialState.userId);
    }
  }, [initialState.userId, getUserProfile]);

  useEffect(() => {
    if (checkFormSubmission && isSuccess && userProfile) {
      const form4dDate = userProfile.data.form4d_submitted;
      if (form4dDate) {
        const date = new Date(form4dDate);
        if (!isNaN(date.getTime())) {
          setIsForm4dSubmitted(true);
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
      const { form4e } = userProfile.data;
      console.log(form4e);
      if (form4e) {
         setManuscriptDetails({
          name_of_author: form4e.name_of_author,
          title_of_manuscript: form4e.title_of_manuscript,
          conference_name: form4e.conference_name,
          year_of_publications: form4e.year_of_publications,
        });
      }
    }
  }, [userProfile]);


  useEffect(() => {
    const getForm4EData = async () => {
      const token = sessionStorage.getItem("access");
      if (!token) {
        console.error("No access token found in session storage");
        return;
      }

      try {
        console.log(initialState.userId);
        const res = await axios.get(
          `http://127.0.0.1:8000/api/form4E/user/${initialState.userId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = res.data.data;
        setManuscriptDetails({
          name_of_author: data.name_of_author,
          title_of_manuscript: data.title_of_manuscript,
          conference_name: data.conference_name,
          year_of_publications: data.year_of_publications,
        });

        setIsSubmitted(true);
      } catch (error) {
        // console.error('Error fetching data:', error.response ? error.response.data : error.message);
      }
    };
    getForm4EData();
  }, [initialState.userId, isSubmitted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setManuscriptDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      ...manuscriptDetails,
    };
    try {
      const response = await form4eSubmit(formData);
      console.log(response);
      await updateUser({ id: initialState.userId, status: "Thesis Submitted" }).unwrap();
      console.log('Status updated to "Thesis Submitted"');
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Failed to submit form.");
    }
    toast.success("Submitted Successfull");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (checkFormSubmission && !isForm4dSubmitted) {
    return <div>Form 2 must be submitted before you can access Form 3A.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <form
        className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-gray-700">
          Declaration of Manuscript Details
        </h2>

        <div className="grid grid-cols-4 gap-4">
          <div>
            <label
              htmlFor={`name_of_author`}
              className="block text-sm font-medium text-gray-700"
            >
              Name of the authors:
            </label>
            <input
              readOnly={isSubmitted}
              type="text"
              id={`name_of_author`}
              name="name_of_author"
              value={manuscriptDetails.name_of_author}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor={`title_of_manuscript`}
              className="block text-sm font-medium text-gray-700"
            >
              Title of the manuscript:
            </label>
            <input
              readOnly={isSubmitted}
              type="text"
              id={`title_of_manuscript`}
              name="title_of_manuscript"
              value={manuscriptDetails.title_of_manuscript}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor={`conference_name`}
              className="block text-sm font-medium text-gray-700"
            >
              Journal / Conference Name, Publisher:
            </label>
            <input
              readOnly={isSubmitted}
              type="text"
              id={`conference_name`}
              name="conference_name"
              value={manuscriptDetails.conference_name}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor={`year_of_publications`}
              className="block text-sm font-medium text-gray-700"
            >
              Volume No, Issue No, Year of publication:
            </label>
            <input
              readOnly={isSubmitted}
              type="text"
              id={`year_of_publications`}
              name="year_of_publications"
              value={manuscriptDetails.year_of_publications}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>

        <div>
          <p className="text-sm mt-4">
            This is to certify that I am the co-author for the above manuscript
            and hereby declare that to the best of my knowledge these original
            research works were / will not for used for the award of any degree
            or diploma of International Institute of Information Technology,
            Bhubaneswar or any other Institute.
          </p>
          <label className="inline-flex items-center mt-4">
            <input
              disabled={isSubmitted}
              type="checkbox"
              checked={isAgreed || isSubmitted}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">
              I agree to the declaration.
            </span>
          </label>
        </div>

        <div>
          {!isSubmitted && <button
            type="submit"
            disabled={!isAgreed}
            className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isAgreed
                ? "bg-blue-500 hover:bg-blue-700"
                : "bg-gray-500 cursor-not-allowed"
            }`}
          >
            Submit
          </button>}
        </div>
        <UploadForm formName='form4E' userId={userId} fieldName='softcopy_url' buttonId='f4e_upload' />
      </form>
    </div>
  );
};

export default Form4E;
