import React, { useState } from 'react';

const Form4C = () => {
  const [candidateDetails, setCandidateDetails] = useState({
    date: '',
    name: '',
    rollNo: '',
    department: '',
    dateOfRegistration: '',
    titleOfThesis: '',
    degree: '',
    supervisors: ''
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

  const handleCandidateChange = (field, value) => {
    setCandidateDetails({ ...candidateDetails, [field]: value });
  };

  const handleExaminerChange = (list, index, field, value) => {
    const updatedList = list === 'indian' ? [...indianExaminers] : [...foreignExaminers];
    updatedList[index] = { ...updatedList[index], [field]: value };
    list === 'indian' ? setIndianExaminers(updatedList) : setForeignExaminers(updatedList);
  };

  const addExaminer = (list) => {
    const newExaminer = {
      name: '',
      designation: '',
      institute: '',
      areasOfInterest: '',
      postalAddress: '',
      phoneNo: '',
      emailId: ''
    };
    list === 'indian' ? setIndianExaminers([...indianExaminers, newExaminer]) : setForeignExaminers([...foreignExaminers, newExaminer]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      candidateDetails,
      indianExaminers,
      foreignExaminers
    };
    console.log(formData); // Replace this with your actual form submission logic
    alert('Form submitted. Check the console for the data!');
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
            <input type="text" id={key} value={candidateDetails[key]} onChange={(e) => handleCandidateChange(key, e.target.value)}
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
        <button type="button" onClick={() => addExaminer('indian')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
          Add Indian Examiner
        </button>

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
        <button type="button" onClick={() => addExaminer('foreign')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
          Add Foreign Examiner
        </button>

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
