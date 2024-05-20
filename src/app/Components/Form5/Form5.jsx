import React, { useEffect, useState } from 'react';
import { useForm5SubmitMutation } from '../../Services/formService';
import { useSelector } from "react-redux";
import axios from "axios";

const Form5 = () => {
  const initialState = useSelector((state) => state.user);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [candidateDetails, setCandidateDetails] = useState({
    name: '',
    rollno: '',
    title_of_thesis: ''
  });

  const [recommendations, setRecommendations] = useState({
    is_academic_standard: false,
    is_viva: false,
    is_modification: false,
    is_modification_final: false,
    is_rejected: false,
  });

  const [form5Submit, form5SubmitResponse] = useForm5SubmitMutation();

  const handleInputChange = (field, value) => {
    setCandidateDetails({ ...candidateDetails, [field]: value });
  };

  const handleRadioChange = (field) => {
    setRecommendations({
      is_academic_standard: field === 'is_academic_standard',
      is_viva: field === 'is_viva',
      is_modification: field === 'is_modification',
      is_modification_final: field === 'is_modification_final',
      is_rejected: field === 'is_rejected',
    });
  };

  useEffect(() => {
    const getForm5Data = async () => {
      const token = sessionStorage.getItem("access");
      if (!token) {
        console.error("No access token found in session storage");
        return;
      }

      try {
        console.log(initialState.userId);
        const res = await axios.get(
          `http://127.0.0.1:8000/api/form5/user/${initialState.userId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = res.data.data;
        setCandidateDetails({
          name: data.name,
          rollno: data.rollno,
          title_of_thesis: data.title_of_thesis
        });
        setRecommendations({
          is_academic_standard: data.is_academic_standard,
          is_viva: data.is_viva,
          is_modification: data.is_modification,
          is_modification_final: data.is_modification_final,
          is_rejected: data.is_rejected,
        });

        setIsSubmitted(true);
      } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
      }
    };
    getForm5Data();
  }, [initialState.userId, isSubmitted]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      ...candidateDetails,
      ...recommendations,
    };
    console.log(formData); // Ideally send this to an API
    try {
      const response = await form5Submit(formData);
      console.log(response);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Failed to submit form.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-gray-700">Recommendation of Examiners on Ph.D. Thesis</h2>
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name of the Candidate:</label>
          <input readOnly={isSubmitted} type="text" id="name" value={candidateDetails.name}
                 onChange={(e) => handleInputChange('name', e.target.value)}
                 className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>

        <div>
          <label htmlFor="rollNo" className="block text-sm font-medium text-gray-700">Roll No:</label>
          <input readOnly={isSubmitted} type="text" id="rollNo" value={candidateDetails.rollno}
                 onChange={(e) => handleInputChange('rollno', e.target.value)}
                 className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title of the thesis:</label>
          <input readOnly={isSubmitted} type="text" id="title" value={candidateDetails.title_of_thesis}
                 onChange={(e) => handleInputChange('title_of_thesis', e.target.value)}
                 className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>

        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-gray-700">Recommendations:</legend>
          <label className="flex items-start">
            <input disabled={isSubmitted} type="radio" name="recommendations" value="is_academic_standard" checked={recommendations.is_academic_standard}
                   onChange={() => handleRadioChange('is_academic_standard')}
                   className="form-radio h-5 w-5 text-blue-600 mt-0.5"/>
            <span className="ml-2 text-gray-700">
              The thesis meets the academic standard of institutions of higher learning around the world. It may be accepted for award of the Ph.D. degree in its present form.
            </span>
          </label>
          <label className="flex items-start">
            <input disabled={isSubmitted} type="radio" name="recommendations" value="is_viva" checked={recommendations.is_viva}
                   onChange={() => handleRadioChange('is_viva')}
                   className="form-radio h-5 w-5 text-blue-600 mt-0.5"/>
            <span className="ml-2 text-gray-700">
              The thesis is acceptable subject to clarification of certain points at the time of viva-voce. (List of points enclosed)
            </span>
          </label>
          <label className="flex items-start">
            <input disabled={isSubmitted} type="radio" name="recommendations" value="is_modification" checked={recommendations.is_modification}
                   onChange={() => handleRadioChange('is_modification')}
                   className="form-radio h-5 w-5 text-blue-600 mt-0.5"/>
            <span className="ml-2 text-gray-700">
              The thesis is acceptable subject to modification / clarification / revision, as per enclosed details. After modification the thesis need NOT be referred back to me.
            </span>
          </label>
          <label className="flex items-start">
            <input disabled={isSubmitted} type="radio" name="recommendations" value="is_modification_final" checked={recommendations.is_modification_final}
                   onChange={() => handleRadioChange('is_modification_final')}
                   className="form-radio h-5 w-5 text-blue-600 mt-0.5"/>
            <span className="ml-2 text-gray-700">
              The thesis is acceptable subject to further work/modification/substantial revision of text, as per enclosed details. After modification the thesis should be referred back to me for final assessment.
            </span>
          </label>
          <label className="flex items-start">
            <input disabled={isSubmitted} type="radio" name="recommendations" value="is_rejected" checked={recommendations.is_rejected}
                   onChange={() => handleRadioChange('is_rejected')}
                   className="form-radio h-5 w-5 text-blue-600 mt-0.5"/>
            <span className="ml-2 text-gray-700">
              The thesis does not meet the standards of comparable works in institutions of higher learning it is rejected.
            </span>
          </label>
        </fieldset>

        <div>
          {!isSubmitted && <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>}
        </div>
      </form>
    </div>
  );
}

export default Form5;
