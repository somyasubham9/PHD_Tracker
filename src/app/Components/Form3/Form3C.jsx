import React, { useEffect, useState } from 'react';
import { useForm3CSubmitMutation } from '../../Services/formService';
import { useSelector } from "react-redux";
import axios from "axios";

const Form3C = () => {
  const initialState = useSelector((state) => state.user);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [scholarName, setScholarName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [branch, setBranch] = useState('');
  const [dateOfSeminar, setDateOfSeminar] = useState('');
  const [topicOfTheTalk, setTopicOfTheTalk] = useState('');
  const [progress, setProgress] = useState('');
  const [committeeMembers, setCommitteeMembers] = useState(Array(6).fill({ name: '', remarks: '', signature: '' }));

  const [form3cSubmit,form3cSubmitResponse]=useForm3CSubmitMutation();

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...committeeMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setCommitteeMembers(updatedMembers);
  };

  useEffect(()=>{
    const getForm3CData = async () => {
      const token = sessionStorage.getItem("access");
      if (!token) {
        console.error("No access token found in session storage");
        return;
      }
  
      try {
        console.log(initialState.userId);
        const res = await axios.get(
          `http://127.0.0.1:8000/api/form3C/user/${initialState.userId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const data = res.data.data;
        setScholarName(data.name);
        setRollNo(data.rollno);
        setBranch(data.branch);
        setDateOfSeminar(data.date_of_seminar);
        setTopicOfTheTalk(data.topic_of_talk);
        setProgress(data.progress);
        setCommitteeMembers(data.committee)
  
        setIsSubmitted(true);
      } catch (error) {
        // console.error('Error fetching data:', error.response ? error.response.data : error.message);
      }
    };
    getForm3CData();
  },[initialState.userId,isSubmitted])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      name:scholarName,
      rollno:rollNo,
      branch:branch,
      date_of_seminar:dateOfSeminar,
      topic_of_talk:topicOfTheTalk,
      progress:progress,
      committees:committeeMembers,
    };

    try {
      const response = await form3cSubmit(formData);
      console.log(response);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Failed to submit form.");
    }

    console.log(formData); // Replace this with your actual form submission logic
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-gray-700">Semester Progress Report</h2>
        
        <div>
          <label htmlFor="scholarName" className="block text-sm font-medium text-gray-700">Name of the Scholar:</label>
          <input readOnly={isSubmitted} type="text" id="scholarName" value={scholarName} onChange={e => setScholarName(e.target.value)}
                 className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>

        <div className='flex w-full gap-8'>
          <div className='w-1/2'>
            <label htmlFor="rollNo" className="block text-sm font-medium text-gray-700">Roll No.:</label>
            <input readOnly={isSubmitted} type="text" id="rollNo" value={rollNo} onChange={e => setRollNo(e.target.value)}
                   className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
          </div>
          <div className='w-1/2'>
            <label htmlFor="branch" className="block text-sm font-medium text-gray-700">Branch:</label>
            <input readOnly={isSubmitted} type="text" id="branch" value={branch} onChange={e => setBranch(e.target.value)}
                   className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
          </div>
        </div>

        <div>
          <label htmlFor="dateOfSeminar" className="block text-sm font-medium text-gray-700">Date of the Seminar:</label>
          <input readOnly={isSubmitted} type="date" id="dateOfSeminar" value={dateOfSeminar} onChange={e => setDateOfSeminar(e.target.value)}
                 className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>

        <div>
          <label htmlFor="topicOfTheTalk" className="block text-sm font-medium text-gray-700">Topic of the talk:</label>
          <input readOnly={isSubmitted} type="text" id="topicOfTheTalk" value={topicOfTheTalk} onChange={e => setTopicOfTheTalk(e.target.value)}
                 className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>

        <div>
          <label htmlFor="progress" className="block text-sm font-medium text-gray-700">Progress (Satisfactory / Unsatisfactory):</label>
          <select disabled={isSubmitted} id="progress" value={progress} onChange={e => setProgress(e.target.value)}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm">
            <option value="">Select Progress</option>
            <option value="satisfactory">Satisfactory</option>
            <option value="unsatisfactory">Unsatisfactory</option>
          </select>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700">Signature of Doctoral Scrutiny Committee Members:</h3>
          {committeeMembers.map((member, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 mb-2">
              <input readOnly={isSubmitted} type="text" placeholder="Name" value={member.name} onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                     className="col-span-1 p-2 border border-gray-300 rounded-md shadow-sm"/>
              <input readOnly={isSubmitted} type="text" placeholder="Remarks" value={member.remarks} onChange={(e) => handleMemberChange(index, 'remarks', e.target.value)}
                     className="col-span-1 p-2 border border-gray-300 rounded-md shadow-sm"/>
              <input readOnly={isSubmitted} type="text" placeholder="Signature" value={member.signature} onChange={(e) => handleMemberChange(index, 'signature', e.target.value)}
                     className="col-span-1 p-2 border border-gray-300 rounded-md shadow-sm"/>
            </div>
          ))}
        </div>

        <div>
        {!isSubmitted && (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Form3C;
