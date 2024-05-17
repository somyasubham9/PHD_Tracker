import React, { useState } from 'react';

const Form4E = () => {
  const [manuscriptDetails, setManuscriptDetails] = useState([{
    authors: '',
    title: '',
    journalName: '',
    volumeInfo: ''
  }]);

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
    setManuscriptDetails([...manuscriptDetails, { authors: '', title: '', journalName: '', volumeInfo: '' }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(manuscriptDetails); // For now, we log to the console; replace with API call as needed
    alert('Manuscript details submitted. Check the console for data!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-gray-700">Declaration of Manuscript Details</h2>
        
        {manuscriptDetails.map((detail, index) => (
          <div key={index} className="grid grid-cols-4 gap-4">
            <div>
              <label htmlFor={`authors-${index}`} className="block text-sm font-medium text-gray-700">Name of the authors:</label>
              <input type="text" id={`authors-${index}`} value={detail.authors}
                     onChange={(e) => handleChange(index, 'authors', e.target.value)}
                     className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
            </div>
            <div>
              <label htmlFor={`title-${index}`} className="block text-sm font-medium text-gray-700">Title of the manuscript:</label>
              <input type="text" id={`title-${index}`} value={detail.title}
                     onChange={(e) => handleChange(index, 'title', e.target.value)}
                     className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
            </div>
            <div>
              <label htmlFor={`journalName-${index}`} className="block text-sm font-medium text-gray-700">Journal / Conference Name, Publisher:</label>
              <input type="text" id={`journalName-${index}`} value={detail.journalName}
                     onChange={(e) => handleChange(index, 'journalName', e.target.value)}
                     className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
            </div>
            <div>
              <label htmlFor={`volumeInfo-${index}`} className="block text-sm font-medium text-gray-700">Volume No, Issue No, Year of publication:</label>
              <input type="text" id={`volumeInfo-${index}`} value={detail.volumeInfo}
                     onChange={(e) => handleChange(index, 'volumeInfo', e.target.value)}
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
            <input type="checkbox" required className="form-checkbox h-5 w-5 text-blue-600"/>
            <span className="ml-2 text-gray-700">I agree to the declaration.</span>
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

export default Form4E;
