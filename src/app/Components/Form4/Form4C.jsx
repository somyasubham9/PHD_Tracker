import React, { useState } from 'react';
import { useForm4CSubmitMutation } from '../../Services/formService';

const Form4C = () => {
  const [form4cSubmit,form4cSubmitResponse]=useForm4CSubmitMutation();
  const [committeeMembers, setCommitteeMembers] = useState(Array(5).fill({ name: '', signature: '' }));
  const [candidateDetails, setCandidateDetails] = useState({
    name: '',
    rollno: '',
    department: '',
    date_of_registeration: '',
    title_of_thesis: '',
    degree: '',
    supervisor: ''
  });

  const [indianExaminers, setIndianExaminers] = useState([{
    name: '',
    designation: '',
    institute: '',
    areasOfInterest: '',
    postalAddress: '',
    phoneNo: '',
    emailId: ''
  }]);

  const [foreignExaminers, setForeignExaminers] = useState([{
    name: '',
    designation: '',
    institute: '',
    areasOfInterest: '',
    postalAddress: '',
    phoneNo: '',
    emailId: ''
  }]);

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...committeeMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setCommitteeMembers(updatedMembers);
  };


  const handleCandidateChange = (field, value) => {
    setCandidateDetails({ ...candidateDetails, [field]: value });
  };

  const handleExaminerChange = (list, index, field, value) => {
    const updatedList = list === 'indian' ? [...indianExaminers] : [...foreignExaminers];
    updatedList[index] = { ...updatedList[index], [field]: value };
    list === 'indian' ? setIndianExaminers(updatedList) : setForeignExaminers(updatedList);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      ...candidateDetails,
      // Here we have to pass examiner id and foreign id instead of object
      indian_examiner_id:indianExaminers,
      foreign_examiner_id:foreignExaminers,
      committee:committeeMembers,
    };
    try {
      const response = await form4cSubmit(formData);
      console.log(response);
    } catch (error) {
      console.error(error);
      alert('Failed to submit form.');
    }
  };
  
  const examinersParagraph = `
The following panel of names for the composition of the Board of Examiners has been suggested by the 
Doctoral Scrutiny Committee as per Section 15 of Regulation for Doctoral Programme: 
Indian Examiners: ${indianExaminers.map(ex => ex.name).join(', ')}
Foreign Examiners: ${foreignExaminers.map(ex => ex.name).join(', ')}
`;

  return (
    <div className="container mx-auto px-4 py-8">
      <form className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-gray-700">Board of Examiners for Evaluation of PhD Thesis</h2>
        
        {/* Candidate Details */}
        {Object.keys(candidateDetails).map((key) => (
          <div key={key}>
            <label htmlFor={key} className="block text-sm font-medium text-gray-700">{key.replace(/([A-Z])/g, ' $1').trim()}:</label>
            <input type={key === 'date_of_registeration' ? 'date' : 'text'} id={key} value={candidateDetails[key]} onChange={(e) => handleCandidateChange(key, e.target.value)}
                   className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
          </div>
        ))}

        {/* Dynamic Indian Examiners */}
        <h3 className="text-lg font-medium text-gray-700">Indian Examiners:</h3>
        {indianExaminers.map((examiner, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 mb-2">
            {Object.keys(examiner).map((key) => (
              <input key={key} type="text" placeholder={`${key} ${index + 1}`} value={examiner[key]}
                     onChange={(e) => handleExaminerChange('indian', index, key, e.target.value)}
                     className="col-span-1 p-2 border border-gray-300 rounded-md shadow-sm"/>
            ))}
          </div>
        ))}

        {/* Dynamic Foreign Examiners */}
        <h3 className="text-lg font-medium text-gray-700">Foreign Examiners:</h3>
        {foreignExaminers.map((examiner, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 mb-2">
            {Object.keys(examiner).map((key) => (
              <input key={key} type="text" placeholder={`${key} ${index + 1}`} value={examiner[key]}
                     onChange={(e) => handleExaminerChange('foreign', index, key, e.target.value)}
                     className="col-span-1 p-2 border border-gray-300 rounded-md shadow-sm"/>
            ))}
          </div>
        ))}

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


        <div>
          <p className="mt-4 text-sm text-gray-700">{examinersParagraph}</p>
        </div>

        <div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form4C;
