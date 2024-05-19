import React, { useState } from 'react';
import { useForm4DSubmitMutation } from '../../Services/formService';

const Form4D = () => {
const [form4dSubmit,form4dSubmitResponse]=useForm4DSubmitMutation();

  const [certifications, setCertifications] = useState({
    noJointPublication: false,
    notSupervisor: false,
    notRelated: false
  });

  const handleChange = (field) => {
    setCertifications(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const formData={}
    try {
      const response = await form4dSubmit(formData);
      console.log(response);
    } catch (error) {
      console.error(error);
      alert("Failed to submit form.");
    }
    alert('Conflict of Interest form submitted. Check the console for the data!');
  };

  const declarationText = `
    This is to certify that the examiner list submitted by me does not have any conflict of interest. I certify the following:
    - The Examiner does not have joint publication with me.
    - The Examiner was not one of my supervisors.
    - The Examiner is not directly related to me (The term directly related to me includes spouse, children, sister, brother, grandchildren, nephew, niece, grandparents, uncle, aunt, first cousin, son-in-law, daughter-in-law, and nephew, niece, grandniece, grandnephew of supervisor’s wife/husband).
  `;

  return (
    <div className="container mx-auto px-4 py-8">
      <form className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-gray-700">Conflict of Interest Form</h2>
        
        <div className="text-sm mb-4">{declarationText}</div>

        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" checked={certifications.noJointPublication} onChange={() => handleChange('noJointPublication')}
                   className="form-checkbox h-5 w-5 text-blue-600"/>
            <span className="ml-2 text-gray-700">The Examiner does not have joint publication with me.</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" checked={certifications.notSupervisor} onChange={() => handleChange('notSupervisor')}
                   className="form-checkbox h-5 w-5 text-blue-600"/>
            <span className="ml-2 text-gray-700">The Examiner was not one of my supervisors.</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" checked={certifications.notRelated} onChange={() => handleChange('notRelated')}
                   className="form-checkbox h-5 w-5 text-blue-600"/>
            <span className="ml-2 text-gray-700">The Examiner is not directly related to me.</span>
          </label>
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

export default Form4D;
