import React, { useState } from 'react';

const Form4A = () => {
  const [scholarName, setScholarName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [department, setDepartment] = useState('');
  const [committeeMembers, setCommitteeMembers] = useState(Array(5).fill({ name: '', signature: '' }));

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...committeeMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setCommitteeMembers(updatedMembers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      scholarName,
      rollNo,
      department,
      committeeMembers
    };
    console.log(formData); // Replace this with your actual form submission logic
    alert('Form submitted. Check the console for the data!');
  };
    
    const synopsisSubmissionParagraph = `
    Certified that research Work of Shri/Ms. ${scholarName}, Department of ${department}, Roll No. ${rollNo} 
    is nearly complete and the Candidate will be able to submit his/her thesis within the time limit of Three months 
    prescribed under the regulations. A synopsis of his/her proposed thesis may kindly be accepted for initiating 
    the evaluation process.
    `;

  return (
    <div className="container mx-auto px-4 py-8">
      <form className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-gray-700">Proposal for Submission of Synopsis of PhD Thesis</h2>
        
        <div>
          <label htmlFor="scholarName" className="block text-sm font-medium text-gray-700">Name of the Scholar:</label>
          <input type="text" id="scholarName" value={scholarName} onChange={e => setScholarName(e.target.value)}
                 className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>

        <div>
          <label htmlFor="rollNo" className="block text-sm font-medium text-gray-700">Roll No:</label>
          <input type="text" id="rollNo" value={rollNo} onChange={e => setRollNo(e.target.value)}
                 className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>

        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department:</label>
          <input type="text" id="department" value={department} onChange={e => setDepartment(e.target.value)}
                 className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
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
              
              <div>
  <p className="mt-4 text-sm text-gray-700">{synopsisSubmissionParagraph}</p>
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

export default Form4A;
