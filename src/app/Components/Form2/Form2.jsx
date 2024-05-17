import React from 'react';

const Form2 = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <form className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6">
        <h2 className="text-2xl font-bold text-gray-700">Monthly PhD Fellowship Claim Form</h2>
        
        <div>
          <label htmlFor="claimMonth" className="block text-sm font-medium text-gray-700">Month and year for which the claim is made:</label>
          <input type="month" id="claimMonth" className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>

        <div className="flex justify-between">
          <div className="w-1/2 pr-2">
            <label htmlFor="scholarName" className="block text-sm font-medium text-gray-700">Name of the Research Scholar:</label>
            <input type="text" id="scholarName" className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
          </div>

          <div className="w-1/2 pl-2">
            <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">Roll Number:</label>
            <input type="text" id="rollNumber" className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
          </div>
        </div>

        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department:</label>
          <input type="text" id="department" className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>

        <div className="flex justify-between">
          <div className="w-1/2 pr-2">
            <label htmlFor="dateOfJoining" className="block text-sm font-medium text-gray-700">Date of Joining the PhD programme:</label>
            <input type="date" id="dateOfJoining" className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
          </div>

          <div className="w-1/2 pl-2">
            <label htmlFor="hoursWorked" className="block text-sm font-medium text-gray-700">Work done (in Hours):</label>
            <input type="number" id="hoursWorked" className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
          </div>
        </div>

        <div>
          <label htmlFor="natureOfWork" className="block text-sm font-medium text-gray-700">Nature of work:</label>
          <textarea id="natureOfWork" className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm" rows="3"></textarea>
        </div>

        <div>
          <label htmlFor="declaration" className="block text-sm font-medium text-gray-700">Declaration:</label>
          <p className="text-sm">I hereby declare that I am not receiving financial support / salary from any other Organizations / Institutes.</p>
          <div className="mt-2">
            <label htmlFor="signature" className="block text-sm font-medium text-gray-700">Signature of the student (with date):</label>
            <input type="text" id="signature" className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
          </div>
        </div>

        <div>
          <label htmlFor="supervisorRemarks" className="block text-sm font-medium text-gray-700">Remarks by the supervisor(s) on the performance of the scholar:</label>
          <textarea id="supervisorRemarks" className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm" rows="3"></textarea>
        </div>

        <div>
          <label htmlFor="supervisorSignature" className="block text-sm font-medium text-gray-700">Signature of the Supervisor(s) (with date):</label>
          <input type="text" id="supervisorSignature" className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
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

export default Form2;
