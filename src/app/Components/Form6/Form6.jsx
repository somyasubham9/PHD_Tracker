import React, { useState } from 'react';
import { useForm6SubmitMutation } from '../../Services/formService'; 

const Form6 = () => {
  // Form state setup and mutation hook
  const [reportDetails, setReportDetails] = useState({
    date_of_viva_voce: '',
    name: '',
    rollno: '',
    department: '',
    title_of_thesis: '',
    degree: '',
    indian_examiner: '',
    foreign_examiner: '',
    supervisor: '',
    number_of_people: '',
    performance: '',
  });

  const [comments, setComments] = useState(['']);
  const [form6Submit, { isLoading }] = useForm6SubmitMutation();

  const handleChange = (field, value) => {
    setReportDetails({ ...reportDetails, [field]: value });
  };

  const handleCommentChange = (index, value) => {
    const updatedComments = comments.map((comment, idx) => idx === index ? value : comment);
    setComments(updatedComments);
  };

  const handleAddComment = () => {
    setComments([...comments, '']);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      ...reportDetails,
      comments: comments.filter(comment => comment.trim() !== '')
    };

    try {
      await form6Submit(formData).unwrap();
      alert('Report details submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. See console for details.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-gray-700">Report on Defense of PhD Degree</h2>
        <div className="grid grid-cols-2 gap-4">
        {Object.entries(reportDetails).map(([key, value]) => (
          <div key={key}>
            <label htmlFor={key} className="block text-sm font-medium text-gray-700">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace(/Examiner I/, 'Examiner I (Indian)').replace(/Examiner Ii/, 'Examiner II (Foreign)')}:
            </label>
            <input
              type={key.includes('date_of_viva_voce') ? 'date' : 'text'} // Only 'date_of_viva_voce' should be a date input
              id={key}
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        ))}
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700">Comments (if any):</h3>
          {comments.map((comment, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={comment}
                onChange={(e) => handleCommentChange(index, e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                placeholder={`Comment ${index + 1}`}
              />
              {index > 0 && (
                <button type="button" onClick={() => handleCommentChange(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddComment} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
            Add Comment
          </button>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form6;

