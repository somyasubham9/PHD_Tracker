import React, { useState } from 'react';
import { useForm2SubmitMutation } from '../../Services/formService';

const Form2 = () => {
  const [claimMonth, setClaimMonth] = useState("");
  const [scholarName, setScholarName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [natureOfWork, setNatureOfWork] = useState("");
  const [signature, setSignature] = useState("");
  const [supervisorRemarks, setSupervisorRemarks] = useState("");
  const [supervisorSignature, setSupervisorSignature] = useState("");

  const [form2Submit, form2SubmitResponse] = useForm2SubmitMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      month_year:claimMonth,
      name:scholarName,
      rollno:rollNumber,
      department:department,
      date_of_joining:dateOfJoining,
      work_done:hoursWorked,
      nature_of_work:natureOfWork,
      remarks_by_supervisor:supervisorRemarks,
    };

    try {
      const response = await form2Submit(formData);
      console.log(response);
      // Handle success response
    } catch (error) {
      console.error(error);
      // Handle error response
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6">
        <h2 className="text-2xl font-bold text-gray-700">Monthly PhD Fellowship Claim Form</h2>
        
        <div>
          <label htmlFor="claimMonth" className="block text-sm font-medium text-gray-700">Month and year for which the claim is made:</label>
          <input
            type="month"
            id="claimMonth"
            value={claimMonth}
            onChange={(e) => setClaimMonth(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="flex justify-between">
          <div className="w-1/2 pr-2">
            <label htmlFor="scholarName" className="block text-sm font-medium text-gray-700">Name of the Research Scholar:</label>
            <input
              type="text"
              id="scholarName"
              value={scholarName}
              onChange={(e) => setScholarName(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div className="w-1/2 pl-2">
            <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">Roll Number:</label>
            <input
              type="text"
              id="rollNumber"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department:</label>
          <input
            type="text"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="flex justify-between">
          <div className="w-1/2 pr-2">
            <label htmlFor="dateOfJoining" className="block text-sm font-medium text-gray-700">Date of Joining the PhD programme:</label>
            <input
              type="date"
              id="dateOfJoining"
              value={dateOfJoining}
              onChange={(e) => setDateOfJoining(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div className="w-1/2 pl-2">
            <label htmlFor="hoursWorked" className="block text-sm font-medium text-gray-700">Work done (in Hours):</label>
            <input
              type="number"
              id="hoursWorked"
              value={hoursWorked}
              onChange={(e) => setHoursWorked(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="natureOfWork" className="block text-sm font-medium text-gray-700">Nature of work:</label>
          <textarea
            id="natureOfWork"
            value={natureOfWork}
            onChange={(e) => setNatureOfWork(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
            rows="3"
          ></textarea>
        </div>

        <div>
          {/* <label htmlFor="declaration" className="block text-sm font-medium text-gray-700">Declaration:</label> */}
          <p className="text-sm">I hereby declare that I am not receiving financial support / salary from any other Organizations / Institutes.</p>
          {/* <div className="mt-2">
            <label htmlFor="signature" className="block text-sm font-medium text-gray-700">Signature of the student (with date):</label>
            <input
              type="text"
              id="signature"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div> */}
        </div>

        <div>
          <label htmlFor="supervisorRemarks" className="block text-sm font-medium text-gray-700">Remarks by the supervisor(s) on the performance of the scholar:</label>
          <textarea
            id="supervisorRemarks"
            value={supervisorRemarks}
            onChange={(e) => setSupervisorRemarks(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
            rows="3"
          ></textarea>
        </div>

        {/* <div>
          <label htmlFor="supervisorSignature" className="block text-sm font-medium text-gray-700">Signature of the Supervisor(s) (with date):</label>
          <input
            type="text"
            id="supervisorSignature"
            value={supervisorSignature}
            onChange={(e) => setSupervisorSignature(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div> */}

        <div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form2;
