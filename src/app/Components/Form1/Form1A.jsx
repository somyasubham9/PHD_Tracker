import React, { useState } from 'react';

const Form1A = () => {
  const [qualifications, setQualifications] = useState([{
    standard: '',
    university: '',
    degree: '',
    year: '',
    marks: '',
    subjects: ''
  }]);

  const handleAddRow = () => {
    const newRow = {
      standard: '',
      university: '',
      degree: '',
      year: '',
      marks: '',
      subjects: ''
    };
    setQualifications([...qualifications, newRow]);
  };

  const handleRemoveRow = (index) => {
    const rows = [...qualifications];
    rows.splice(index, 1);
    setQualifications(rows);
  };

  const handleChange = (index, event) => {
    const newQualifications = qualifications.map((qualification, idx) => {
      if (idx === index) {
        return { ...qualification, [event.target.name]: event.target.value };
      }
      return qualification;
    });
    setQualifications(newQualifications);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6">
        <h2 className="text-2xl font-bold text-gray-700">DOCTORAL SCRUTINY COMMITTEE (DSC) FOR PhD CANDIDATE</h2>
        
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department:</label>
          <input type="text" id="department" className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>

        <div>
          <label htmlFor="candidateName" className="block text-sm font-medium text-gray-700">Full name of the candidate:</label>
          <input type="text" id="candidateName" className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>

        <div>
          <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">Roll Number:</label>
          <input type="text" id="rollNumber" className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Academic Qualification (Graduation onwards):</label>
          {qualifications.map((qualification, index) => (
            <div key={index} className="grid grid-cols-8 gap-3 items-end">
              <input type="text" name="standard" placeholder="Standard" value={qualification.standard} onChange={(e) => handleChange(index, e)} className="col-span-1 p-2 border border-gray-300 rounded-md shadow-sm"/>
              <input type="text" name="university" placeholder="University/Institute" value={qualification.university} onChange={(e) => handleChange(index, e)} className="col-span-2 p-2 border border-gray-300 rounded-md shadow-sm"/>
              <input type="text" name="degree" placeholder="Degree" value={qualification.degree} onChange={(e) => handleChange(index, e)} className="col-span-1 p-2 border border-gray-300 rounded-md shadow-sm"/>
              <input type="text" name="year" placeholder="Year (Passing)" value={qualification.year} onChange={(e) => handleChange(index, e)} className="col-span-1 p-2 border border-gray-300 rounded-md shadow-sm"/>
              <input type="text" name="marks" placeholder="% of Marks or CGPA" value={qualification.marks} onChange={(e) => handleChange(index, e)} className="col-span-1 p-2 border border-gray-300 rounded-md shadow-sm"/>
              <input type="text" name="subjects" placeholder="Subjects of Study" value={qualification.subjects} onChange={(e) => handleChange(index, e)} className="col-span-2 p-2 border border-gray-300 rounded-md shadow-sm"/>
              {index > 0 && (
                <button type="button" onClick={() => handleRemoveRow(index)} className="ml-2 bg-red-500 text-white p-1 rounded">Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddRow} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Add Row</button>
        </div>

        <div>
          <label htmlFor="researchArea" className="block text-sm font-medium text-gray-700">Broad area of research proposed:</label>
          <textarea id="researchArea" className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm" rows="4"></textarea>
        </div>

        <fieldset>
          <legend className="text-sm font-medium text-gray-700">Category of studentship:</legend>
          <div className="mt-2 space-y-2">
            {["Institute Fellowship", "UGC/CSIR Fellowship", "Sponsored/Self-financed (Full time)", "Sponsored/Self-financed (Part time)", "Institute Faculty Members"].map((item, idx) => (
              <div key={idx}>
                <label className="inline-flex items-center">
                  <input type="radio" name="studentship" className="form-radio h-5 w-5 text-blue-600"/>
                  <span className="ml-2 text-gray-700">{item}</span>
                </label>
              </div>
            ))}
          </div>
        </fieldset>
        <div>
        <label htmlFor="recommender1" className="block text-sm font-medium text-gray-700">Recommender 1:</label>
        <input type="text" id="recommender1" name="recommender1" className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm" placeholder="Name of Recommender 1"/>
        </div>

        <div>
        <label htmlFor="recommender2" className="block text-sm font-medium text-gray-700">Recommender 2:</label>
        <input type="text" id="recommender2" name="recommender2" className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm" placeholder="Name of Recommender 2"/>
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

export default Form1A;
