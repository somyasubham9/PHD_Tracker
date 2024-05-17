import React, { useState } from 'react';

const Form5 = () => {
  const [candidateDetails, setCandidateDetails] = useState({
    name: '',
    rollNo: '',
    title: ''
  });
  const [recommendation, setRecommendation] = useState('');

  const handleInputChange = (field, value) => {
    setCandidateDetails({ ...candidateDetails, [field]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      ...candidateDetails,
      recommendation
    };
    console.log(formData); // Ideally send this to an API
    alert('Recommendation submitted. Check the console for details!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-gray-700">Recommendation of Examiners on Ph.D. Thesis</h2>
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name of the Candidate:</label>
          <input type="text" id="name" value={candidateDetails.name}
                 onChange={(e) => handleInputChange('name', e.target.value)}
                 className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>

        <div>
          <label htmlFor="rollNo" className="block text-sm font-medium text-gray-700">Roll No:</label>
          <input type="text" id="rollNo" value={candidateDetails.rollNo}
                 onChange={(e) => handleInputChange('rollNo', e.target.value)}
                 className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title of the thesis:</label>
          <input type="text" id="title" value={candidateDetails.title}
                 onChange={(e) => handleInputChange('title', e.target.value)}
                 className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>

        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-gray-700">Recommendations:</legend>
          {[
            "The thesis meets the academic standard of institutions of higher learning around the world. It may be accepted for award of the Ph.D. degree in its present form.",
            "The thesis is acceptable subject to clarification of certain points at the time of viva-voce. (List of points enclosed)",
            "The thesis is acceptable subject to modification / clarification / revision, as per enclosed details. After modification the thesis need NOT be referred back to me.",
            "The thesis is acceptable subject to further work/modification/substantial revision of text, as per enclosed details. After modification the thesis should be referred back to me for final assessment.",
            "The thesis does not meet the standards of comparable works in institutions of higher learning it is rejected."
          ].map((option, index) => (
            <label key={index} className="flex items-start">
              <input type="radio" name="recommendation" value={option}
                     onChange={() => setRecommendation(option)}
                     checked={recommendation === option}
                     className="form-radio h-5 w-5 text-blue-600 mt-0.5"/>
              <span className="ml-2 text-gray-700">{option}</span>
            </label>
          ))}
        </fieldset>

        <div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form5;
