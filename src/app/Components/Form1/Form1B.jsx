import React, { useEffect, useState } from "react";
import { useForm1BSubmitMutation } from "../../Services/formService";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLazyGetUserProfileQuery, useStatusUpdateMutation, useUserUpdateMutation } from "../../Services/userServices";

const Form1B = ({ checkFormSubmission = true , userId}) => {
  const initialState = useSelector((state) => state.user);
  const [form1bSubmit, form1bSubmitResponse] = useForm1BSubmitMutation();
  const [updateUser] = useStatusUpdateMutation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [getUserProfile, { data: userProfile, isLoading, isSuccess }] = useLazyGetUserProfileQuery();
  const [loading, setLoading] = useState(true); // New loading state

  const [department, setDepartment] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [dateOfEnrollment, setDateOfEnrollment] = useState("");
  const [researchArea, setResearchArea] = useState("");
  const [studentship, setStudentship] = useState("");
  const [courses, setCourses] = useState([
    {
      subject_id: "",
      course_title: "",
      credits: "",
      remarks: "",
    },
  ]);

  const [isForm1ASubmitted, setIsForm1ASubmitted] = useState(false);
    useEffect(() => {
    if (userId) {
      getUserProfile(userId);
    }
    }, [userId, getUserProfile]);
  
  useEffect(() => {
    if (checkFormSubmission && initialState.userId) {
      getUserProfile(initialState.userId);
    }
  }, [initialState.userId, getUserProfile, checkFormSubmission]);

  useEffect(() => {
    if (checkFormSubmission && isSuccess && userProfile) {
      const form1aDate = userProfile.data.form1a_submitted;
      if (form1aDate) {
        const date = new Date(form1aDate);
        if (!isNaN(date.getTime())) {
          setIsForm1ASubmitted(true);
        }
      }
    }
  }, [userProfile, isSuccess, checkFormSubmission]);

  

  useEffect(() => {
    const getForm1bData = async () => {
      const token = sessionStorage.getItem("access");
      if (!token) {
        console.error("No access token found in session storage");
        setLoading(false); // Stop loading if no token
        return;
      }

      try {
        console.log(initialState.userId);
        const res = await axios.get(
          `http://127.0.0.1:8000/api/form1B/user/${initialState.userId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = res.data.data;
        console.log(data);
        setDepartment(data.department || "");
        setCandidateName(data.name || "");
        setRollNumber(data.rollno || "");
        setDateOfEnrollment(data.date_of_enrolment || "");
        setResearchArea(data.area_of_research || "");
        setStudentship(data.category_of_studentship || "");
        setCourses(data.course || []); // Ensure courses is an array
        setIsSubmitted(true);
      } catch (error) {
        console.error(
          "Error fetching data:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false); // Stop loading after data is fetched or error occurs
      }
    };
    getForm1bData();
  }, [initialState.userId,isSubmitted]);

  useEffect(() => {
    if (userProfile) {
      const { form1b } = userProfile.data;
      if (form1b) {
        setDepartment(form1b.department);
        setCandidateName(form1b.name);
        setRollNumber(form1b.rollno);
        setDateOfEnrollment(form1b.date_of_enrolment);
        setStudentship(form1b.category_of_studentship);
        setResearchArea(form1b.area_of_research)
        setCourses(form1b.course|| [{ standard: "", university: "", degree: "", year_of_passing: "", cgpa: "", subjects: "" }]);
      }
    }
  }, [userProfile]);
  
  const handleAddCourse = () => {
    const newCourse = {
      subject_id: "",
      course_title: "",
      credits: "",
      remarks: "",
    };
    setCourses([...courses, newCourse]);
  };

  const handleRemoveCourse = (index) => {
    const newCourses = [...courses];
    newCourses.splice(index, 1);
    setCourses(newCourses);
  };

  const handleChange = (index, event) => {
    const newCourses = courses.map((course, idx) => {
      if (idx === index) {
        return { ...course, [event.target.name]: event.target.value };
      }
      return course;
    });
    setCourses(newCourses);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      department,
      name: candidateName,
      rollno: rollNumber,
      date_of_enrolment: dateOfEnrollment,
      area_of_research: researchArea,
      category_of_studentship: studentship,
      courses,
    };
    
    try {
      const formResponse = await form1bSubmit(formData).unwrap();
      console.log(formResponse);
      
      // Update status to "Registered" if form submission is successful
      await updateUser({ id: initialState.userId, status: "Registered" }).unwrap();
      console.log('Status updated to "Registered"');
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form or updating status:', error);
    }

  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }

 if (!isForm1ASubmitted && checkFormSubmission) {
    return <div>Form 1A must be submitted before you can access Form 1B.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-700">
          COURSEWORK RECOMMENDED BY DSC FOR Ph.D. CANDIDATE
        </h2>

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

        <div>
          <label
            htmlFor="candidateName"
            className="block text-sm font-medium text-gray-700"
          >
            Full name of the candidate:
          </label>
          <input
            type="text"
            id="candidateName"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
            readOnly={isSubmitted}
          />
        </div>

        <div>
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

        <div>
          <label
            htmlFor="dateOfEnrollment"
            className="block text-sm font-medium text-gray-700"
          >
            Date of Enrolment/Admission:
          </label>
          <input
            type="date"
            id="dateOfEnrollment"
            value={dateOfEnrollment}
            onChange={(e) => setDateOfEnrollment(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
            readOnly={isSubmitted}
          />
        </div>

        <div>
          <label
            htmlFor="researchArea"
            className="block text-sm font-medium text-gray-700"
          >
            Broad area of research proposed:
          </label>
          <textarea
            id="researchArea"
            value={researchArea}
            onChange={(e) => setResearchArea(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
            rows="4"
            readOnly={isSubmitted}
          ></textarea>
        </div>

        <fieldset>
          <legend className="text-sm font-medium text-gray-700">
            Category of studentship:
          </legend>
          <div className="mt-2 space-y-2">
            {[
              "Institute Fellowship",
              "UGC/CSIR Fellowship",
              "Sponsored/Self-financed (Full time)",
              "Sponsored/Self-financed (Part time)",
              "Institute Faculty Members",
            ].map((item, idx) => (
              <div key={idx}>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="studentship"
                    value={item}
                    checked={studentship === item}
                    onChange={(e) => setStudentship(e.target.value)}
                    className="form-radio h-5 w-5 text-blue-600"
                    disabled={isSubmitted}
                  />
                  <span className="ml-2 text-gray-700">{item}</span>
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Course work recommended (if any):
          </label>
          {courses.map((course, index) => (
            <div key={index} className="grid grid-cols-6 gap-3 items-center mb-2">
              <input
                type="text"
                name="subject_id"
                placeholder="Subject-ID"
                value={course.subject_id}
                onChange={(e) => handleChange(index, e)}
                className="col-span-1 p-2 border border-gray-300 rounded-md shadow-sm"
                readOnly={isSubmitted}
              />
              <input
                type="text"
                name="course_title"
                placeholder="Course Title"
                value={course.course_title}
                onChange={(e) => handleChange(index, e)}
                className="col-span-2 p-2 border border-gray-300 rounded-md shadow-sm"
                readOnly={isSubmitted}
              />
              <input
                type="text"
                name="credits"
                placeholder="Credits"
                value={course.credits}
                onChange={(e) => handleChange(index, e)}
                className="col-span-1 p-2 border border-gray-300 rounded-md shadow-sm"
                readOnly={isSubmitted}
              />
              <input
                type="text"
                name="remarks"
                placeholder="Remarks"
                value={course.remarks}
                onChange={(e) => handleChange(index, e)}
                className="col-span-2 p-2 border border-gray-300 rounded-md shadow-sm"
                readOnly={isSubmitted}
              />
              {index > 0 && !isSubmitted && (
                <button
                  type="button"
                  onClick={() => handleRemoveCourse(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {!isSubmitted && (
            <button
              type="button"
              onClick={handleAddCourse}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm"
            >
              Add Course
            </button>
          )}
        </div>

        {!isSubmitted && (
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default Form1B;
