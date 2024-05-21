import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { useLazyGetUserProfileQuery } from "../../Services/userServices";
import { AiOutlineCheckCircle } from 'react-icons/ai';
import Form1A from '../Form1/Form1A';
import Form1B from '../Form1/Form1B';
import Form2 from '../Form2/Form2';
import Form3A from '../Form3/Form3A';

const StudentProfile = () => {
  const { userId } = useParams(); // Extract userId from URL
  const [getUserProfile, { data: userProfile, isLoading, isError, isFetched }] = useLazyGetUserProfileQuery();
    const [selectedForm, setSelectedForm] = useState(null);
  // Fetch user profile when component mounts or userId changes
  useEffect(() => {
    if (userId) {
      getUserProfile(userId);
    }
  }, [userId, getUserProfile]);
    
  const isFormSubmitted = (submissionDate) => submissionDate !== null && submissionDate !== undefined;

  if (isLoading) return <div>Loading...</div>;
  if (isError || !userProfile) return <div>Error fetching the user profile or user not found.</div>;
    const userData = userProfile.data;

    const renderFormComponent = () => {
    switch (selectedForm) {
        case 'form1a': return <Form1A userId={userId}  />;
      case 'form1b': return <Form1B userId={userId} checkForm1ASubmission={false}/>;
      case 'form2': return <Form2 userId={userId} />;
      case 'form3a': return <Form3A userId={userId} />;
      // Add cases for other forms
      default: return null;
    }
  };
    
  return (
    <div className="h-screen w-full">
      <div className="relative">
        <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 h-48 w-full object-cover lg:h-56"></div>
        <img
          src={userProfile.profile_pic || "https://i.pinimg.com/736x/f5/97/55/f59755a3995d1d20d1daa8d98c3ba5ac.jpg"}
          alt="Profile"
          className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border-8 border-white shadow-xl"
          style={{ top: '100%' }}
        />
      </div>

      <div className="px-4 pt-32 pb-6 bg-white shadow-xl rounded-lg mx-auto mt-6 lg:mt-4">
        <h1 className="text-4xl font-bold text-center mb-4 text-blue-700">{userProfile.data.first_name} {userProfile.data.last_name}</h1>
        <p className="text-center text-lg text-gray-600">{userProfile.data.email}</p>
        <p className="text-center text-gray-600 font-medium mt-1">Department : {userProfile.data.department}</p>
        <div className="mt-6 px-6">
          <h3 className="text-2xl md:text-2xl lg:text-3xl font-semibold text-gray-700">Area of Research</h3>
          <p className="text-md md:text-lg lg:text-xl text-gray-800 mt-2 leading-relaxed">
            {userProfile.data.area_of_research || "No research area specified."}
          </p>
        </div>
      </div>
      
      <div className="px-4 py-6">
        <h3 className="text-2xl font-semibold text-center mb-4">Submitted Forms</h3>
        <div className="grid grid-cols-4 gap-4">
          {['form1a', 'form1b', 'form2', 'form3a', 'form3b', 'form3c', 'form4a', 'form4b', 'form4c', 'form4d', 'form4e', 'form5', 'form6'].map((form) => (
            isFormSubmitted(userProfile.data[form + '_submitted']) && (
              <div key={form} className="bg-slate-100 p-4 shadow rounded-lg h-20 flex items-center space-x-2 cursor-pointer"
                onClick={() => setSelectedForm(form)}>
                <AiOutlineCheckCircle className="text-green-500 text-3xl"/>
                <span className="text-blue-500 hover:text-blue-700 text-2xl">
                  {`Form ${form.toUpperCase().replace(/[A-Z]/g, ' $&').trim()}`}
                </span>
              </div>
            )
          ))}
        </div>
        {renderFormComponent()}
      </div>
    </div>
  );
};

export default StudentProfile;
