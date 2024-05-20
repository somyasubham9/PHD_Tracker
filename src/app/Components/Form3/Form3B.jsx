import React, { useEffect, useState } from 'react';
import { useForm3BSubmitMutation } from '../../Services/formService';
import { useSelector } from "react-redux";
import axios from "axios";

const Form3B = () => {
  const initialState = useSelector((state) => state.user);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [fullName, setFullName] = useState('');
  const [semester, setSemester] = useState('');
  const [session, setSession] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [category, setCategory] = useState('');
  const [dateOfEnrolment, setDateOfEnrolment] = useState('');
  const [department, setDepartment] = useState('');
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [permanentAddress, setPermanentAddress] = useState('');
  const [feeDate, setFeeDate] = useState('');
  const [broadAreaOfResearch, setBroadAreaOfResearch] = useState('');
  const [stayPeriodFrom, setStayPeriodFrom] = useState('');
  const [stayPeriodTo, setStayPeriodTo] = useState('');

  const [form3bSubmit,form3bSubmitResponse]=useForm3BSubmitMutation();

  useEffect(()=>{
    const getForm3BData = async () => {
      const token = sessionStorage.getItem("access");
      if (!token) {
        console.error("No access token found in session storage");
        return;
      }
  
      try {
        console.log(initialState.userId);
        const res = await axios.get(
          `http://127.0.0.1:8000/api/form3B/user/${initialState.userId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const data = res.data.data;
        setFullName(data.name);
        setSemester(data.semester);
        setSession(data.session);
        setRollNo(data.rollno);
        setCategory(data.category);
        setDateOfEnrolment(data.date_of_enrolment);
        setDepartment(data.department);
        setRegistrationComplete(data.is_registration_completed);
        setPermanentAddress(data.permanent_address);
        setFeeDate(data.fees_date);
        setBroadAreaOfResearch(data.area_of_research)
        setStayPeriodFrom(data.institute_stay_date_from);
        setStayPeriodTo(data.institute_stay_date_to);
  
        setIsSubmitted(true);
      } catch (error) {
        // console.error('Error fetching data:', error.response ? error.response.data : error.message);
      }
    };
    getForm3BData();
  },[initialState.userId,isSubmitted])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      name:fullName,
      semester:semester,
      session:session,
      rollno:rollNo,
      category:category,
      date_of_enrolment:dateOfEnrolment,
      department:department,
      is_registration_completed:registrationComplete,
      permanent_address:permanentAddress,
      fees_date:feeDate,
      area_of_research:broadAreaOfResearch,
      institute_stay_date_from:stayPeriodFrom,
      institute_stay_date_to:stayPeriodTo,
    };
    try {
      const response = await form3bSubmit(formData);
      console.log(response);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Failed to submit form.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-gray-700">Semester Registration [For Research Scholar]</h2>
        
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full name (in Capital letters):</label>
          <input readOnly={isSubmitted} type="text" id="fullName" value={fullName} onChange={e => setFullName(e.target.value)}
                 className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm" />
        </div>

        <div className="flex justify-between">
          <div className="w-1/2 pr-2">
            <label htmlFor="semester" className="block text-sm font-medium text-gray-700">Semester:</label>
            <input readOnly={isSubmitted} type="text" id="semester" value={semester} onChange={e => setSemester(e.target.value)}
                   className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
          </div>

          <div className="w-1/2 pl-2">
            <label htmlFor="session" className="block text-sm font-medium text-gray-700">Session:</label>
            <input readOnly={isSubmitted} type="text" id="session" value={session} onChange={e => setSession(e.target.value)}
                   className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="w-1/2 pr-2">
            <label htmlFor="rollNo" className="block text-sm font-medium text-gray-700">Roll No:</label>
            <input readOnly={isSubmitted} type="text" id="rollNo" value={rollNo} onChange={e => setRollNo(e.target.value)}
                   className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
          </div>

          <div className="w-1/2 pl-2">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
            <input readOnly={isSubmitted} type="text" id="category" value={category} onChange={e => setCategory(e.target.value)}
                   className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="w-1/2 pr-2">
            <label htmlFor="dateOfEnrolment" className="block text-sm font-medium text-gray-700">Date of Enrolment:</label>
            <input readOnly={isSubmitted} type="date" id="dateOfEnrolment" value={dateOfEnrolment} onChange={e => setDateOfEnrolment(e.target.value)}
                   className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
          </div>

          <div className="w-1/2 pl-2">
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department:</label>
            <input readOnly={isSubmitted} type="text" id="department" value={department} onChange={e => setDepartment(e.target.value)}
                   className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
          </div>
        </div>

        <div>
          <label htmlFor="registrationComplete" className="block text-sm font-medium text-gray-700">Registration Seminar Completed:</label>
          <select disabled={isSubmitted} id="registrationComplete" value={registrationComplete ? "YES" : "NO"} onChange={e => setRegistrationComplete(e.target.value === "YES")}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm">
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>
        </div>

        <div>
          <label htmlFor="permanentAddress" className="block text-sm font-medium text-gray-700">Permanent Address:</label>
          <textarea readOnly={isSubmitted} id="permanentAddress" value={permanentAddress} onChange={e => setPermanentAddress(e.target.value)}
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm" rows="3"></textarea>
        </div>

        <div>
          <label htmlFor="feeDate" className="block text-sm font-medium text-gray-700">Date upto which fees have been paid:</label>
          <input readOnly={isSubmitted} type="date" id="feeDate" value={feeDate} onChange={e => setFeeDate(e.target.value)}
                 className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>

        <div>
          <label htmlFor="broadAreaOfResearch" className="block text-sm font-medium text-gray-700">Broad area of Research:</label>
          <input readOnly={isSubmitted} type="text" id="broadAreaOfResearch" value={broadAreaOfResearch} onChange={e => setBroadAreaOfResearch(e.target.value)}
                 className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>

        <div className="flex justify-between">
          <div className="w-1/2 pr-2">
            <label htmlFor="stayPeriodFrom" className="block text-sm font-medium text-gray-700">Period of stay in the Institute (from):</label>
            <input readOnly={isSubmitted} type="date" id="stayPeriodFrom" value={stayPeriodFrom} onChange={e => setStayPeriodFrom(e.target.value)}
                   className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
          </div>

          <div className="w-1/2 pl-2">
            <label htmlFor="stayPeriodTo" className="block text-sm font-medium text-gray-700">to:</label>
            <input readOnly={isSubmitted} type="date" id="stayPeriodTo" value={stayPeriodTo} onChange={e => setStayPeriodTo(e.target.value)}
                   className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
          </div>
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

export default Form3B;
