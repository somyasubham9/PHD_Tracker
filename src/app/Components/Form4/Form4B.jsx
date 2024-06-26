import React, { useEffect, useState } from 'react';
import { useForm4BSubmitMutation } from '../../Services/formService';
import { useSelector } from "react-redux";
import axios from "axios";
import { useLazyGetUserProfileQuery } from '../../Services/userServices';
import UploadForm from '../UploadForm/uploadForm';
import { toast } from 'react-toastify';

const Form4B = ({ checkFormSubmission = true, userId }) => {
  const initialState = useSelector((state) => state.user);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [scholarName, setScholarName] = useState('');
  const [department, setDepartment] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const [committeeMembers, setCommitteeMembers] = useState(Array(5).fill({ name: '' }));

  const [form4bSubmit, form4bSubmitResponse] = useForm4BSubmitMutation();
  const [getUserProfile, { data: userProfile, isLoading, isSuccess }] = useLazyGetUserProfileQuery();

  const [isForm4aSubmitted, setIsForm4aSubmitted] = useState(false);

  useEffect(() => {
    if (checkFormSubmission && initialState.userId) {
      getUserProfile(initialState.userId);
    }
  }, [initialState.userId, getUserProfile]);

  useEffect(() => {
    if (checkFormSubmission && isSuccess && userProfile) {
      const form4aDate = userProfile.data.form4a_submitted;
      if (form4aDate) {
        const date = new Date(form4aDate);
        if (!isNaN(date.getTime())) {
          setIsForm4aSubmitted(true);
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
      const { form4b } = userProfile.data;
      console.log(form4b);
      if (form4b) {
        setScholarName(form4b.name);
        setRollNo(form4b.rollno);
        setDepartment(form4b.department);
        setSubmissionDate(form4b.thesis_date);
        setCommitteeMembers(form4b.committee);
      }
    }
  }, [userProfile]);



  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...committeeMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setCommitteeMembers(updatedMembers);
  };

  useEffect(() => {
    const getForm4BData = async () => {
      const token = sessionStorage.getItem("access");
      if (!token) {
        console.error("No access token found in session storage");
        return;
      }

      try {
        console.log(initialState.userId);
        const res = await axios.get(
          `http://127.0.0.1:8000/api/form4B/user/${initialState.userId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = res.data.data;
        setScholarName(data.name);
        setRollNo(data.rollno);
        setDepartment(data.department);
        setSubmissionDate(data.thesis_date);
        setCommitteeMembers(data.committee);

        setIsSubmitted(true);
      } catch (error) {
        // console.error('Error fetching data:', error.response ? error.response.data : error.message);
      }
    };
    getForm4BData();
  }, [initialState.userId, isSubmitted]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      name:scholarName,
      department:department,
      rollno:rollNo,
      thesis_date:submissionDate,
      committees:committeeMembers
    };
    try {
      const response = await form4bSubmit(formData);
      console.log(response);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Failed to submit form.");
    }
    toast.success("Submitted Successfull");
  };
    
    const recommendationParagraph = `
Certified that Shri/Ms. ${scholarName}, Department of ${department}, Roll No. ${rollNo} 
has made an oral presentation before the DSC and a general audience. The DSC members have reviewed 
the synopsis and heard the oral presentation. The student has completed the required number of academic 
credits. The DSC is satisfied that he/she can submit the thesis in three months with effect from ${submissionDate}.
`;
  
    if (isLoading) {
    return <div>Loading...</div>;
  }

  if (checkFormSubmission && !isForm4aSubmitted) {
    return <div>Form 4A must be submitted before you can access Form 4B.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <form className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-gray-700">Recommendation of DSC on Synopsis of PhD Thesis</h2>
        
        <div>
          <label htmlFor="scholarName" className="block text-sm font-medium text-gray-700">Name of the Scholar:</label>
          <input readOnly={isSubmitted} type="text" id="scholarName" value={scholarName} onChange={e => setScholarName(e.target.value)}
                 className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>

        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department:</label>
          <input readOnly={isSubmitted} type="text" id="department" value={department} onChange={e => setDepartment(e.target.value)}
                 className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>

        <div>
          <label htmlFor="rollNo" className="block text-sm font-medium text-gray-700">Roll No.:</label>
          <input readOnly={isSubmitted} type="text" id="rollNo" value={rollNo} onChange={e => setRollNo(e.target.value)}
                 className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>

        <div>
          <label htmlFor="submissionDate" className="block text-sm font-medium text-gray-700">Effective Date of Thesis Submission:</label>
          <input readOnly={isSubmitted} type="date" id="submissionDate" value={submissionDate} onChange={e => setSubmissionDate(e.target.value)}
                 className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700">Signature of Doctoral Scrutiny Committee Members:</h3>
          {committeeMembers.map((member, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 mb-2">
              <input readOnly={isSubmitted} type="text" placeholder="Name" value={member.name} onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                     className="col-span-1 p-2 border border-gray-300 rounded-md shadow-sm"/>
            </div>
          ))}
        </div>
        <div>
            <p className="mt-4 text-sm text-gray-700">{recommendationParagraph}</p>
            </div>      

        <div>
        {(!isSubmitted && !initialState.isAdmin && 
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          )}
        </div>
        <UploadForm formName='form4B' userId={userId} fieldName='softcopy_url' buttonId='f4b_upload' />
      </form>
    </div>
  );
}

export default Form4B;
