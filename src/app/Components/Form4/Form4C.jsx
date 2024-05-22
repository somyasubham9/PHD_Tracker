import React, { useEffect, useState } from 'react';
import { useForm4CSubmitMutation, useLazyGetExaminerProfileQuery } from '../../Services/formService';
import { useSelector } from "react-redux";
import axios from "axios";
import { useLazyGetUserProfileQuery } from '../../Services/userServices';

const Form4C = ({ checkFormSubmission = true, userId }) => {
  const initialState = useSelector((state) => state.user);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [form4cSubmit, form4cSubmitResponse] = useForm4CSubmitMutation();
  const [triggerExaminers, { data: examiners, isLoading: isFetching }] = useLazyGetExaminerProfileQuery();
  const [committeeMembers, setCommitteeMembers] = useState(Array(5).fill({ name: '' }));
  const [selectedIndianExaminer, setSelectedIndianExaminer] = useState('');
  const [selectedForeignExaminer, setSelectedForeignExaminer] = useState('');
  const [allIndianExaminers, setAllIndianExaminers] = useState([]);
  const [allForeignExaminers, setAllForeignExaminers] = useState([]);

  const [candidateDetails, setCandidateDetails] = useState({
    name: '',
    rollno: '',
    department: '',
    date_of_registeration: '',
    title_of_thesis: '',
    degree: '',
    supervisor: ''
  });
  const [getUserProfile, { data: userProfile, isLoading, isSuccess }] = useLazyGetUserProfileQuery();

  const [isForm4bSubmitted, setIsForm4bSubmitted] = useState(false);

  useEffect(() => {
    if (checkFormSubmission && initialState.userId) {
      getUserProfile(initialState.userId);
    }
  }, [initialState.userId, getUserProfile]);

  useEffect(() => {
    if (checkFormSubmission && isSuccess && userProfile) {
      const form4bDate = userProfile.data.form4b_submitted;
      if (form4bDate) {
        const date = new Date(form4bDate);
        if (!isNaN(date.getTime())) {
          setIsForm4bSubmitted(true);
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
      const { form4c } = userProfile.data;
      console.log(form4c);
      if (form4c) {
         setCandidateDetails({
          name: form4c.name,
          rollno: form4c.rollno,
          department: form4c.department,
          date_of_registeration: form4c.date_of_registeration,
          title_of_thesis: form4c.title_of_thesis,
          degree: form4c.degree,
          supervisor: form4c.supervisor,
        });
        setSelectedIndianExaminer(form4c.indian_examiner?.id || '');
        setSelectedForeignExaminer(form4c.foreign_examiner?.id || '');
        setCommitteeMembers(form4c.committee);
      }
    }
  }, [userProfile]);


  useEffect(() => {
    triggerExaminers().unwrap().then((res) => {
      if (res) {
        setAllIndianExaminers(res.data.indian);
        setAllForeignExaminers(res.data.foreign);
      }
    });
  }, [triggerExaminers]);

  useEffect(() => {
    const getForm4CData = async () => {
      const token = sessionStorage.getItem("access");
      if (!token) {
        console.error("No access token found in session storage");
        return;
      }

      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/form4C/user/${initialState.userId}/`,
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
          department: data.department,
          date_of_registeration: data.date_of_registeration,
          title_of_thesis: data.title_of_thesis,
          degree: data.degree,
          supervisor: data.supervisor,
        });
        setSelectedIndianExaminer(data.indian_examiner?.id || '');
        setSelectedForeignExaminer(data.foreign_examiner?.id || '');
        setCommitteeMembers(data.committee);

        setIsSubmitted(true);
      } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
      }
    };
    getForm4CData();
  }, [initialState.userId, isSubmitted]);

  const handleCandidateChange = (field, value) => {
    setCandidateDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...committeeMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setCommitteeMembers(updatedMembers);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedIndianExaminer || !selectedForeignExaminer) {
      alert("Please select both an Indian and a Foreign examiner.");
      return;
    }

    const formData = {
      ...candidateDetails,
      indian_examiner_id: parseInt(selectedIndianExaminer),
      foreign_examiner_id: parseInt(selectedForeignExaminer),
      committees: committeeMembers,
    };

    try {
      const response = await form4cSubmit(formData);
      console.log(response);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      alert('Failed to submit form.');
    }
  };

  if (isFetching) {
    return <p>Loading examiners...</p>;
  }

    if (isLoading) {
    return <div>Loading...</div>;
  }

  if (checkFormSubmission && !isForm4bSubmitted) {
    return <div>Form 4B must be submitted before you can access Form 4C.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <form className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-gray-700">Board of Examiners for Evaluation of PhD Thesis</h2>

        {/* Candidate Details */}
        {Object.keys(candidateDetails).map((key) => (
          <div key={key}>
            <label htmlFor={key} className="block text-sm font-medium text-gray-700">{key.replace(/([A-Z])/g, ' $1').trim()}:</label>
            <input readOnly={isSubmitted} type={key === 'date_of_registeration' ? 'date' : 'text'} id={key} value={candidateDetails[key]}
              onChange={(e) => handleCandidateChange(key, e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
        ))}

        {/* Dropdown List of Indian Examiners */}
        <div className="mb-4">
          <label htmlFor="indian-examiners" className="block text-lg font-medium text-gray-700 mb-2">
            Select an Indian Examiner:
          </label>
          <select
            disabled={isSubmitted}
            id="indian-examiners"
            value={selectedIndianExaminer}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
            onChange={(e) => {
              setSelectedIndianExaminer(e.target.value);
            }}
          >
            <option value="" disabled>Select Examiner</option>
            {allIndianExaminers.map((examiner, index) => (
              <option key={index} value={examiner.id}>
                {examiner.name} - {examiner.designation} at {examiner.institute}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown List of Foreign Examiners */}
        <div className="mb-4">
          <label htmlFor="foreign-examiners" className="block text-lg font-medium text-gray-700 mb-2">
            Select a Foreign Examiner:
          </label>
          <select
            disabled={isSubmitted}
            id="foreign-examiners"
            value={selectedForeignExaminer}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
            onChange={(e) => {
              setSelectedForeignExaminer(e.target.value);
            }}
          >
            <option value="" disabled>Select Examiner</option>
            {allForeignExaminers.map((examiner, index) => (
              <option key={index} value={examiner.id}>
                {examiner.name} - {examiner.designation} at {examiner.institute}
              </option>
            ))}
          </select>
        </div>

        {/* Committee Members */}
        <div>
          <h3 className="text-lg font-medium text-gray-700">Signature of Doctoral Scrutiny Committee Members:</h3>
          {committeeMembers.map((member, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 mb-2">
              <input readOnly={isSubmitted} type="text" placeholder="Name" value={member.name} onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                className="col-span-1 p-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
          ))}
        </div>

        {!isSubmitted && <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>}
      </form>
    </div>
  );
}

export default Form4C;
