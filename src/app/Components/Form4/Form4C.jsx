import React, { useEffect, useState } from 'react';
import { useForm4CSubmitMutation, useLazyGetExaminerProfileQuery } from '../../Services/formService';
import { useSelector } from "react-redux";
import axios from "axios";

const Form4C = () => {
  const initialState = useSelector((state) => state.user);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [form4cSubmit, form4cSubmitResponse] = useForm4CSubmitMutation();
  const [triggerExaminers, { data: examiners, isLoading: isFetching }] = useLazyGetExaminerProfileQuery();
  const [committeeMembers, setCommitteeMembers] = useState(Array(5).fill({ name: '', signature: '' }));
  const [selectedIndianExaminers, setSelectedIndianExaminers] = useState([]);
  const [selectedForeignExaminers, setSelectedForeignExaminers] = useState([]);
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
      console.log(initialState.userId);
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
        date_of_registeration:data.date_of_registeration,
        title_of_thesis: data.title_of_thesis,
        degree: data.degree,
        supervisor: data.supervisor,
      });
      setSelectedIndianExaminers(data.indian_examiner);
      setSelectedForeignExaminers(data.foreign_examiner);

      setIsSubmitted(true);
    } catch (error) {
      // console.error('Error fetching data:', error.response ? error.response.data : error.message);
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
    const formData = {
      ...candidateDetails,
      indian_examiner_id: parseInt(selectedIndianExaminers), // Ensure it's an integer
    foreign_examiner_id: parseInt(selectedForeignExaminers),
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
                   className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
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
    className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
    onChange={(e) => {
      setSelectedIndianExaminers(e.target.value);
    }}
  >
    {allIndianExaminers.map((examiner, index) => (
      <option key={index} value={examiner.id}>
        {examiner.name} - {examiner.designation} at {examiner.institute}
      </option>
    ))}
  </select>
</div>

<div className="mb-4">
  <label htmlFor="foreign-examiners" className="block text-lg font-medium text-gray-700 mb-2">
    Select a Foreign Examiner:
  </label>
  <select
  disabled={isSubmitted}
    id="foreign-examiners"
    className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
    onChange={(e) => {
      setSelectedForeignExaminers(e.target.value);
    }}
  >
    {allForeignExaminers.map((examiner, index) => (
      <option key={index} value={examiner.id}>
        {examiner.name} - {examiner.designation} at {examiner.institute}
      </option>
    ))}
  </select>
</div>


        <div>
          <h3 className="text-lg font-medium text-gray-700">Signature of Doctoral Scrutiny Committee Members:</h3>
          {committeeMembers.map((member, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 mb-2">
              <input readOnly={isSubmitted} type="text" placeholder="Name" value={member.name} onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                     className="col-span-1 p-2 border border-gray-300 rounded-md shadow-sm"/>
              <input readOnly={isSubmitted} type="text" placeholder="Signature" value={member.signature} onChange={(e) => handleMemberChange(index, 'signature', e.target.value)}
                     className="col-span-2 p-2 border border-gray-300 rounded-md shadow-sm"/>
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
