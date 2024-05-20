import React, { useState } from 'react';
import { useForm4ESubmitMutation } from '../../Services/formService';

const Form4E = () => {
  const [form4eSubmit, form4eSubmitResponse] = useForm4ESubmitMutation();
  const [manuscriptDetails, setManuscriptDetails] = useState([{
    name_of_author: '',
    title_of_manuscript: '',
    conference_name: '',
    year_of_publications: ''
  }]);
  const [isAgreed, setIsAgreed] = useState(false);

  const handleChange = (index, field, value) => {
    const updatedDetails = manuscriptDetails.map((detail, i) => {
      if (i === index) {
        return { ...detail, [field]: value };
      }
      return detail;
    });
    setManuscriptDetails(updatedDetails);
  };

  const handleAddManuscriptDetail = () => {
    setManuscriptDetails([...manuscriptDetails, { name_of_author: '', title_of_manuscript: '', conference_name: '', year_of_publications: '' }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      manuscriptDetails,
    };
    try {
      const response = await form4eSubmit(formData);
      console.log(response);
      alert('Form submitted successfully. Check the console for the data!');
    } catch (error) {
      console.error(error);
      alert('Failed to submit form.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-gray-700">Declaration of Manuscript Details</h2>
        
        {manuscriptDetails.map((detail, index) => (
          <div key={index} className="grid grid-cols-4 gap-4">
            <div>
              <label htmlFor={`name_of_author-${index}`} className="block text-sm font-medium text-gray-700">Name of the authors:</label>
              <input type="text" id={`name_of_author-${index}`} value={detail.name_of_author}
                     onChange={(e) => handleChange(index, 'name_of_author', e.target.value)}
                     className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
            </div>
            <div>
              <label htmlFor={`title_of_manuscript-${index}`} className="block text-sm font-medium text-gray-700">Title of the manuscript:</label>
              <input type="text" id={`title_of_manuscript-${index}`} value={detail.title_of_manuscript}
                     onChange={(e) => handleChange(index, 'title_of_manuscript', e.target.value)}
                     className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
            </div>
            <div>
              <label htmlFor={`conference_name-${index}`} className="block text-sm font-medium text-gray-700">Journal / Conference Name, Publisher:</label>
              <input type="text" id={`conference_name-${index}`} value={detail.conference_name}
                     onChange={(e) => handleChange(index, 'conference_name', e.target.value)}
                     className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
            </div>
            <div>
              <label htmlFor={`year_of_publications-${index}`} className="block text-sm font-medium text-gray-700">Volume No, Issue No, Year of publication:</label>
              <input type="text" id={`year_of_publications-${index}`} value={detail.year_of_publications}
                     onChange={(e) => handleChange(index, 'year_of_publications', e.target.value)}
                     className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
            </div>
          </div>
        ))}

        <button type="button" onClick={handleAddManuscriptDetail} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Another Manuscript
        </button>

        <div>
          <p className="text-sm mt-4">
            This is to certify that I am the co-author for the above manuscript and hereby declare that to the best of my knowledge 
            these original research works were / will not for used for the award of any degree or diploma of International Institute 
            of Information Technology, Bhubaneswar or any other Institute.
          </p>
          <label className="inline-flex items-center mt-4">
            <input type="checkbox" checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)}
                   className="form-checkbox h-5 w-5 text-blue-600"/>
            <span className="ml-2 text-gray-700">I agree to the declaration.</span>
          </label>
        </div>

        <div>
          <button
            type="submit"
            disabled={!isAgreed}
            className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isAgreed ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-500 cursor-not-allowed'
            }`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form4E;
