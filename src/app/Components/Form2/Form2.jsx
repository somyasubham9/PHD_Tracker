import React, { useEffect, useState } from "react";
import { useForm2SubmitMutation } from "../../Services/formService";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLazyGetUserProfileQuery } from "../../Services/userServices";
import UploadForm from "../UploadForm/uploadForm";
import { toast } from "react-toastify";

const Form2 = ({ checkFormSubmission = true , userId}) => {
  const initialState = useSelector((state) => state.user);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [claimMonth, setClaimMonth] = useState("");
  const [scholarName, setScholarName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [natureOfWork, setNatureOfWork] = useState("");
  const [supervisorRemarks, setSupervisorRemarks] = useState("");

  const [form2Submit, form2SubmitResponse] = useForm2SubmitMutation();
  const [formVisible, setFormVisible] = useState(false);
  const [getUserProfile, { data: userProfile }] = useLazyGetUserProfileQuery();

      useEffect(() => {
    if (userId) {
      getUserProfile(userId);
    }
      }, [userId, getUserProfile]);
  
  useEffect(() => {
    const getForm2Data = async () => {
      const token = sessionStorage.getItem("access");
      if (!token) {
        console.error("No access token found in session storage");
        return;
      }

      try {
        console.log(initialState.userId);
        const res = await axios.get(
          `http://127.0.0.1:8000/api/form2/user/${initialState.userId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = res.data.data;

        setClaimMonth(data.month_year);
        setScholarName(data.name);
        setRollNumber(data.rollno);
        setDepartment(data.department);
        setHoursWorked(data.work_done);
        setNatureOfWork(data.nature_of_work);
        setSupervisorRemarks(data.remarks_by_supervisor);

        // Handle date of joining
        const dateOfJoiningFromServer = data.date_of_joining || "";
        if (dateOfJoiningFromServer) {
          // Format the date if needed
          // Assuming dateOfJoiningFromServer is in ISO format (yyyy-mm-dd)
          const formattedDate = dateOfJoiningFromServer.split("T")[0];
          setDateOfJoining(formattedDate);
        }

        setIsSubmitted(true);
      } catch (error) {
        // console.error('Error fetching data:', error.response ? error.response.data : error.message);
      }
    };
    getForm2Data();
  }, [initialState.userId, isSubmitted]);

  useEffect(() => {
    if (checkFormSubmission && initialState.userId) {
      getUserProfile(initialState.userId);
    }
  }, [initialState.userId, getUserProfile, checkFormSubmission]);

  useEffect(() => {
    if (checkFormSubmission) {
      
      if (userProfile && userProfile.data.form1b_submitted) {
        const form1bDate = new Date(userProfile.data.form1b_submitted);
        const currentDate = new Date();
        const yearDiff = currentDate.getFullYear() - form1bDate.getFullYear();
  
        if (yearDiff >= 2) {
          setFormVisible(true);
        } else {
          console.log("Form2 cannot be shown yet. The required time since Form1B submission has not elapsed.");
        }
      }
    } else {
      setFormVisible(true)
    }
  }, [userProfile]);

       useEffect(() => {
    if (userProfile) {
      const { form2 } = userProfile.data;
      if (form2) {
        setClaimMonth(form2.month_year);
        setScholarName(form2.name);
        setRollNumber(form2.rollno);
        setDepartment(form2.department);
        setHoursWorked(form2.work_done);
        setNatureOfWork(form2.nature_of_work);
        setSupervisorRemarks(form2.remarks_by_supervisor);
      }
    }
     }, [userProfile]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      month_year: claimMonth,
      name: scholarName,
      rollno: rollNumber,
      department: department,
      date_of_joining: dateOfJoining,
      work_done: hoursWorked,
      nature_of_work: natureOfWork,
      remarks_by_supervisor: supervisorRemarks,
    };

    try {
      const response = await form2Submit(formData);
      console.log(response);
      setIsSubmitted(true);
      // Handle success response
    } catch (error) {
      console.error(error);
      // Handle error response
    }
    toast.success("Submitted Successfull");
  };

  return formVisible ? (
    <div className="container mx-auto px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-700">
          Monthly PhD Fellowship Claim Form
        </h2>

        <div>
          <label
            htmlFor="claimMonth"
            className="block text-sm font-medium text-gray-700"
          >
            Month and year for which the claim is made:
          </label>
          <input
            type="month"
            id="claimMonth"
            value={claimMonth}
            onChange={(e) => setClaimMonth(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
            readOnly={isSubmitted}
          />
        </div>

        <div className="flex justify-between">
          <div className="w-1/2 pr-2">
            <label
              htmlFor="scholarName"
              className="block text-sm font-medium text-gray-700"
            >
              Name of the Research Scholar:
            </label>
            <input
              type="text"
              id="scholarName"
              value={scholarName}
              onChange={(e) => setScholarName(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
              readOnly={isSubmitted}
            />
          </div>

          <div className="w-1/2 pl-2">
            <label
              htmlFor="rollNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Roll Number:
            </label>
            <input
              type="text"
              id="rollNumber"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
              readOnly={isSubmitted}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="department"
            className="block text-sm font-medium text-gray-700"
          >
            Department:
          </label>
          <input
            type="text"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
            readOnly={isSubmitted}
          />
        </div>

        <div className="flex justify-between">
          <div className="w-1/2 pr-2">
            <label
              htmlFor="dateOfJoining"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Joining the PhD programme:
            </label>
            <input
              type="date"
              id="dateOfJoining"
              value={dateOfJoining}
              onChange={(e) => setDateOfJoining(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
              readOnly={isSubmitted}
            />
          </div>

          <div className="w-1/2 pl-2">
            <label
              htmlFor="hoursWorked"
              className="block text-sm font-medium text-gray-700"
            >
              Work done (in Hours):
            </label>
            <input
              type="number"
              id="hoursWorked"
              value={hoursWorked}
              onChange={(e) => setHoursWorked(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
              readOnly={isSubmitted}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="natureOfWork"
            className="block text-sm font-medium text-gray-700"
          >
            Nature of work:
          </label>
          <textarea
            id="natureOfWork"
            value={natureOfWork}
            onChange={(e) => setNatureOfWork(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
            rows="3"
            readOnly={isSubmitted}
          ></textarea>
        </div>

        <div>
          {/* <label htmlFor="declaration" className="block text-sm font-medium text-gray-700">Declaration:</label> */}
          <p className="text-sm">
            I hereby declare that I am not receiving financial support / salary
            from any other Organizations / Institutes.
          </p>
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
          <label
            htmlFor="supervisorRemarks"
            className="block text-sm font-medium text-gray-700"
          >
            Remarks by the supervisor(s) on the performance of the scholar:
          </label>
          <textarea
            id="supervisorRemarks"
            value={supervisorRemarks}
            onChange={(e) => setSupervisorRemarks(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
            rows="3"
            readOnly={isSubmitted}
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
          {!isSubmitted && (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          )}
        </div>
        <UploadForm formName='form2' userId={userId} fieldName='softcopy_url' buttonId='f2_upload' />
      </form>
    </div>
  ) : (
      <div className="text-center mt-10">
      <h2>The eligibility criteria for displaying Form 2 has not been met yet.</h2>
    </div>
  );
};

export default Form2;
