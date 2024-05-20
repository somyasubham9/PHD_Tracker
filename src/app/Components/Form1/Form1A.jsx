import React, { useEffect, useState } from "react";
import { useForm1ASubmitMutation } from "../../Services/formService";
import { useSelector } from "react-redux";
import axios from "axios";

const Form1A = () => {
  const initialState = useSelector((state) => state.user);
  const [form1aSubmit, form1aSubmitResponse] = useForm1ASubmitMutation();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [qualifications, setQualifications] = useState([
    {
      standard: "",
      university: "",
      degree: "",
      year_of_passing: "",
      cgpa: "",
      subjects: "",
    },
  ]);

  const [department, setDepartment] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [researchArea, setResearchArea] = useState("");
  const [studentship, setStudentship] = useState("");
  const [recommender1, setRecommender1] = useState("");
  const [recommender2, setRecommender2] = useState("");

  useEffect( () => {
    const getForm1aData = async () => {
      const token = sessionStorage.getItem('access');
      if (!token) {
        console.error('No access token found in session storage');
        return;
      }

      try {
        console.log(initialState.userId)
        const res = await axios.get(`http://127.0.0.1:8000/api/form1A/user/${initialState.userId}/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const data = res.data.data;

        setDepartment(data.department);
        setCandidateName(data.name);
        setRollNumber(data.rollno);
        setResearchArea(data.area_of_research);
        setStudentship(data.category_of_studentship);
        setRecommender1(data.recommender_1);
        setRecommender2(data.recommender_2);
        setQualifications(data.education);
        setIsSubmitted(true); 
      } catch (error) {
        // console.error('Error fetching data:', error.response ? error.response.data : error.message);
      }
    };
    getForm1aData();
  },[initialState.userId,isSubmitted]);

  const handleAddRow = () => {
    const newRow = {
      standard: "",
      university: "",
      degree: "",
      year_of_passing: "",
      cgpa: "",
      subjects: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      department: department,
      name: candidateName,
      rollno: rollNumber,
      education: qualifications,
      area_of_research: researchArea,
      category_of_studentship: studentship,
      recommender_1: recommender1,
      recommender_2: recommender2,
    };

    await form1aSubmit(formData)
      .then((res) => {
        console.log(res);
        setIsSubmitted(true);
      })
      .catch((err) => {
        console.error(err);
      });

    console.log("Submitting");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-700">
          DOCTORAL SCRUTINY COMMITTEE (DSC) FOR PhD CANDIDATE
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Academic Qualification (Graduation onwards):
          </label>
          {qualifications.map((qualification, index) => (
            <div key={index} className="grid grid-cols-8 gap-3 items-end">
              <input
                type="text"
                name="standard"
                placeholder="Standard"
                value={qualification.standard}
                onChange={(e) => handleChange(index, e)}
                className="col-span-1 p-2 border border-gray-300 rounded-md shadow-sm"
                readOnly={isSubmitted}
              />
              <input
                type="text"
                name="university"
                placeholder="University/Institute"
                value={qualification.university}
                onChange={(e) => handleChange(index, e)}
                className="col-span-2 p-2 border border-gray-300 rounded-md shadow-sm"
                readOnly={isSubmitted}
              />
              <input
                type="text"
                name="degree"
                placeholder="Degree"
                value={qualification.degree}
                onChange={(e) => handleChange(index, e)}
                className="col-span-1 p-2 border border-gray-300 rounded-md shadow-sm"
                readOnly={isSubmitted}
              />
              <input
                type="text"
                name="year_of_passing"
                placeholder="Year (Passing)"
                value={qualification.year_of_passing}
                onChange={(e) => handleChange(index, e)}
                className="col-span-1 p-2 border border-gray-300 rounded-md shadow-sm"
                readOnly={isSubmitted}
              />
              <input
                type="text"
                name="cgpa"
                placeholder="% of Marks or CGPA"
                value={qualification.cgpa}
                onChange={(e) => handleChange(index, e)}
                className="col-span-1 p-2 border border-gray-300 rounded-md shadow-sm"
                readOnly={isSubmitted}
              />
              <input
                type="text"
                name="subjects"
                placeholder="Subjects of Study"
                value={qualification.subjects}
                onChange={(e) => handleChange(index, e)}
                className="col-span-2 p-2 border border-gray-300 rounded-md shadow-sm"
                readOnly={isSubmitted}
              />
              {index > 0 && !isSubmitted && (
                <button
                  type="button"
                  onClick={() => handleRemoveRow(index)}
                  className="ml-2 bg-red-500 text-white p-1 rounded"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {!isSubmitted && (
            <button
              type="button"
              onClick={handleAddRow}
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            >
              Add Row
            </button>
          )}
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
                    value={item} // Set the value to the specific item
                    checked={studentship === item} // Set checked if it matches the state
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
          <label
            htmlFor="recommender1"
            className="block text-sm font-medium text-gray-700"
          >
            Recommender 1:
          </label>
          <input
            type="text"
            id="recommender1"
            name="recommender1"
            value={recommender1}
            onChange={(e) => setRecommender1(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Name of Recommender 1"
            readOnly={isSubmitted}
          />
        </div>

        <div>
          <label
            htmlFor="recommender2"
            className="block text-sm font-medium text-gray-700"
          >
            Recommender 2:
          </label>
          <input
            type="text"
            id="recommender2"
            value={recommender2}
            onChange={(e) => setRecommender2(e.target.value)}
            name="recommender2"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Name of Recommender 2"
            readOnly={isSubmitted}
          />
        </div>

        {!isSubmitted && (
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        )}
      </form>
  </div>
  );
};

export default Form1A;
