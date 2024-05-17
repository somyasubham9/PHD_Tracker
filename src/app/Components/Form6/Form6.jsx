import React, { useState } from 'react';

const Form6 = () => {
  const [reportDetails, setReportDetails] = useState({
    dateOfViva: '',
    candidateName: '',
    rollNo: '',
    department: '',
    title: '',
    degree: '',
    examinerIndian: '',
    examinerForeign: '',
    supervisors: '',
    numberPresent: '',
    performance: '',
    modifications: ''
  });

  const [comments, setComments] = useState(['']); // Initialize with a single empty comment

  const handleChange = (field, value) => {
    setReportDetails({ ...reportDetails, [field]: value });
  };

  const handleCommentChange = (index, value) => {
    const updatedComments = [...comments];
    updatedComments[index] = value;
    setComments(updatedComments);
  };

  const handleAddComment = () => {
    setComments([...comments, '']); // Add a new empty comment
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      ...reportDetails,
      comments
    };
    console.log(formData); // Ideally send this to an API
    alert('Report details submitted. Check the console for data!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-gray-700">Report on Defense of PhD Degree</h2>
        
        {/* Input fields structured based on the document layout */}
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(reportDetails).map((key) => (
            <div key={key}>
              <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace('Examiner I', 'Examiner I (Indian)').replace('Examiner Ii', 'Examiner II (Foreign)')}:
              </label>
              <input
                type={key.includes('date') ? 'date' : 'text'}
                id={key}
                value={reportDetails[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                placeholder={key}
              />
            </div>
          ))}
        </div>

        {/* Comments Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-700">Comments (if any):</h3>
          {comments.map((comment, index) => (
            <input
              key={index}
              type="text"
              value={comment}
              onChange={(e) => handleCommentChange(index, e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
              placeholder={`Comment ${index + 1}`}
            />
          ))}
          <button type="button" onClick={handleAddComment} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
            Add Comment
          </button>
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

export default Form6;
