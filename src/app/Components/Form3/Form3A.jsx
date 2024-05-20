import React, { useEffect, useState } from "react";
import { useForm3ASubmitMutation } from "../../Services/formService";
import { useSelector } from "react-redux";
import axios from "axios";

const Form3A = () => {
  const initialState = useSelector((state) => state.user);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [name, setName] = useState("");
  const [seminarDate, setSeminarDate] = useState("");
  const [willAppear, setWillAppear] = useState(true); // true for 'will appear', false for 'not appear'

  const [form3aSubmit, form3aSubmitResponse] = useForm3ASubmitMutation();

useEffect(()=>{
  const getForm3AData = async () => {
    const token = sessionStorage.getItem("access");
    if (!token) {
      console.error("No access token found in session storage");
      return;
    }

    try {
      console.log(initialState.userId);
      const res = await axios.get(
        `http://127.0.0.1:8000/api/form3A/user/${initialState.userId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data.data;
      setName(data.name);
      setSeminarDate(data.seminar_date);

      setIsSubmitted(true);
    } catch (error) {
      // console.error('Error fetching data:', error.response ? error.response.data : error.message);
    }
  };
  getForm3AData();
},[initialState.userId, isSubmitted])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      name: name,
      seminar_date: seminarDate,
    };

    try {
      const response = await form3aSubmit(formData);
      console.log(response);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Failed to submit form.");
    }
  };

  // Construct the full sentence to be displayed below the form fields
  const displaySentence = `This is to certify that Mr./Ms. ${name} ${
    willAppear ? "will" : "will not"
  } appear the final registration seminar for Ph.D. program which is scheduled to be held on ${seminarDate}.`;

  return (
    <div className="container mx-auto px-4 py-8">
      <form
        className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-gray-700">
          Consent Letter for Final Registration Seminar
        </h2>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name of the Candidate:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Mr./Ms. Name"
            readOnly={isSubmitted}
          />
        </div>

        <div className="flex justify-between">
          <div className="w-1/2 pr-2">
            <label
              htmlFor="seminarDate"
              className="block text-sm font-medium text-gray-700"
            >
              Seminar Date:
            </label>
            <input
              type="date"
              id="seminarDate"
              value={seminarDate}
              onChange={(e) => setSeminarDate(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
              readOnly={isSubmitted}
            />
          </div>
          <div className="w-1/2 pl-4 pt-4 flex items-center">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="appearance"
                checked={willAppear}
                onChange={() => setWillAppear(true)}
                className="form-radio h-5 w-5 text-blue-600"
                disabled={isSubmitted}
              />
              <span className="ml-2 text-gray-700">Will appear</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="radio"
                name="appearance"
                checked={!willAppear}
                onChange={() => setWillAppear(false)}
                className="form-radio h-5 w-5 text-blue-600"
                disabled={isSubmitted}
              />
              <span className="ml-2 text-gray-700">Will not appear</span>
            </label>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-600">
            {name && seminarDate
              ? displaySentence
              : "Complete the form to see the preview of the certification sentence."}
          </p>
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
};

export default Form3A;
