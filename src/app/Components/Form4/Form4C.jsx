import React, { useEffect, useState } from 'react';
import { useForm4CSubmitMutation, useLazyGetExaminerProfileQuery } from '../../Services/formService';

const Form4C = () => {
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
    date_of_registration: '',
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
      committee_members: committeeMembers,
    };

    try {
      console.log(formData);
      // const response = await form4cSubmit(formData);
      // console.log(response);
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
            <input type={key === 'date_of_registration' ? 'date' : 'text'} id={key} value={candidateDetails[key]}
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
              <input type="text" placeholder="Name" value={member.name} onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                     className="col-span-1 p-2 border border-gray-300 rounded-md shadow-sm"/>
              <input type="text" placeholder="Signature" value={member.signature} onChange={(e) => handleMemberChange(index, 'signature', e.target.value)}
                     className="col-span-2 p-2 border border-gray-300 rounded-md shadow-sm"/>
            </div>
          ))}
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form4C;
