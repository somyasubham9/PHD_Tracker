import React, { useEffect, useState } from 'react';
import { useForm4ASubmitMutation } from '../../Services/formService';
import { useLazyGetUserProfileQuery } from '../../Services/userServices';
import { useSelector } from 'react-redux';

const Form4A = () => {
  const initialState = useSelector((state) => state.user);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [scholarName, setScholarName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [department, setDepartment] = useState("");
  const [committeeMembers, setCommitteeMembers] = useState(
    Array(5).fill({ name: ""})
  );

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...committeeMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setCommitteeMembers(updatedMembers);
  };

  const [form4aSubmit, form4aSubmitResponse] = useForm4ASubmitMutation();
  const [formVisible, setFormVisible] = useState(false);
  const [getUserProfile, { data: userProfile }] = useLazyGetUserProfileQuery();

    useEffect(() => {
    if (initialState.userId) {
      getUserProfile(initialState.userId);
    }
  }, [initialState.userId, getUserProfile]);

  useEffect(() => {
    if (userProfile && userProfile.data.form3c_submitted) {
      const form3cDate = new Date(userProfile.data.form3c_submitted);
      const currentDate = new Date();
      const yearDiff = currentDate.getFullYear() - form3cDate.getFullYear();
      const monthDiff = currentDate.getMonth() - form3cDate.getMonth() + yearDiff * 12;

      if(monthDiff >= 3) {
        setFormVisible(true);
      } else {
        console.log("Form4 cannot be shown yet. The required time since Form1B submission has not elapsed.");
      }
    }
  }, [userProfile]);

  useEffect(() => {
    const getForm4AData = async () => {
      const token = sessionStorage.getItem("access");
      if (!token) {
        console.error("No access token found in session storage");
        return;
      }

      try {
        console.log(initialState.userId);
        const res = await axios.get(
          `http://127.0.0.1:8000/api/form4A/user/${initialState.userId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = res.data.data;
        setScholarName(data.name);
        setRollNo(data.rollno);
        setDepartment(data.department);
        setCommitteeMembers(data.committee);

        setIsSubmitted(true);
      } catch (error) {
        // console.error('Error fetching data:', error.response ? error.response.data : error.message);
      }
    };
    getForm4AData();
  }, [initialState.userId, isSubmitted]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      name: scholarName,
      rollno: rollNo,
      department: department,
      committees: committeeMembers,
    };
    try {
      const response = await form4aSubmit(formData);
      console.log(response);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Failed to submit form.");
    }
  };

  const synopsisSubmissionParagraph = `
    Certified that research Work of Shri/Ms. ${scholarName}, Department of ${department}, Roll No. ${rollNo} 
    is nearly complete and the Candidate will be able to submit his/her thesis within the time limit of Three months 
    prescribed under the regulations. A synopsis of his/her proposed thesis may kindly be accepted for initiating 
    the evaluation process.
    `;

  return formVisible ? (
    <div className="container mx-auto px-4 py-8">
      <form
        className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-gray-700">
          Proposal for Submission of Synopsis of PhD Thesis
        </h2>

        <div>
          <label
            htmlFor="scholarName"
            className="block text-sm font-medium text-gray-700"
          >
            Name of the Scholar:
          </label>
          <input
            readOnly={isSubmitted}
            type="text"
            id="scholarName"
            value={scholarName}
            onChange={(e) => setScholarName(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label
            htmlFor="rollNo"
            className="block text-sm font-medium text-gray-700"
          >
            Roll No:
          </label>
          <input
            readOnly={isSubmitted}
            type="text"
            id="rollNo"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label
            htmlFor="department"
            className="block text-sm font-medium text-gray-700"
          >
            Department:
          </label>
          <input
            readOnly={isSubmitted}
            type="text"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700">
            Signature of Doctoral Scrutiny Committee Members:
          </h3>
          {committeeMembers.map((member, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 mb-2">
              <input
                readOnly={isSubmitted}
                type="text"
                placeholder="Name"
                value={member.name}
                onChange={(e) =>
                  handleMemberChange(index, "name", e.target.value)
                }
                className="col-span-1 p-2 border border-gray-300 rounded-md shadow-sm"
              />
              
            </div>
          ))}
        </div>

        <div>
          <p className="mt-4 text-sm text-gray-700">
            {synopsisSubmissionParagraph}
          </p>
        </div>

        <div>
          {(!isSubmitted && 
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
  ) : (
      <div className="text-center mt-10">
      <h2>The eligibility criteria for displaying Form 4 has not been met yet.</h2>
    </div>
  );
};

export default Form4A;
