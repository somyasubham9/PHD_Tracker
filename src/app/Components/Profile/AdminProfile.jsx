import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { useLazyGetUserProfileQuery, useIndianUpdateMutation, useForeignUpdateMutation, useStatusUpdateMutation } from "../../Services/userServices";
import { AiFillCheckCircle, AiFillEye, AiOutlineCheckCircle, AiOutlineFileText, AiOutlineSend } from 'react-icons/ai';
import Form1A from '../Form1/Form1A';
import Form1B from '../Form1/Form1B';
import Form2 from '../Form2/Form2';
import Form3A from '../Form3/Form3A';
import Form3B from '../Form3/Form3B';
import Form3C from '../Form3/Form3C';
import Form4A from '../Form4/Form4A';
import Form4B from '../Form4/Form4B';
import Form4C from '../Form4/Form4C';
import Form4D from '../Form4/Form4D';
import Form4E from '../Form4/Form4E';
import Form6 from '../Form6/Form6';
import Form5 from '../Form5/Form5';
import UploadForm from '../UploadForm/uploadForm';
import { useSelector } from "react-redux";

const StudentProfile = () => {
  const initialState = useSelector((state) => state.user);
  const { userId } = useParams(); // Extract userId from URL
  const [getUserProfile, { data: userProfile, isLoading, isError, isFetched }] = useLazyGetUserProfileQuery();
  const [selectedForm, setSelectedForm] = useState(null);
  const [updateUser] = useStatusUpdateMutation();
  const [IndianExaminerComments, setIndianExaminerComments] = useState(null);
   const [ForeignExaminerComments, setForeignExaminerComments] = useState(null);
    const [updateIndianExaminer] = useIndianUpdateMutation();
  const [updateForeignExaminer] = useForeignUpdateMutation();
  const [commentsFetched, setCommentsFetched] = useState({ indian: false, foreign: false });
  const [initialCommentsLoaded, setInitialCommentsLoaded] = useState(false);
  // Fetch user profile when component mounts or userId changes
  useEffect(() => {
    if (userId) {
      getUserProfile(userId);
    }
  }, [userId, getUserProfile]);
    
  const isFormSubmitted = (submissionDate) => submissionDate !== null && submissionDate !== undefined;

  useEffect(() => {
    if (userId) {
      getUserProfile(userId).then(response => {
        if (response?.data) {
          const { comments_by_indian, comments_by_foreign } = response.data.data;
          setIndianExaminerComments(comments_by_indian || '');
          setForeignExaminerComments(comments_by_foreign || '');
          setCommentsFetched({
            indian: !!comments_by_indian,
            foreign: !!comments_by_foreign
          });
        }
      });
    }
  }, [userId, getUserProfile]);

const renderFormComponent = () => {
    switch (selectedForm) {
        case 'form1a': return <Form1A userId={userId} />;
        case 'form1b': return <Form1B userId={userId} checkFormSubmission={false} />;
        case 'form2': return <Form2 userId={userId} checkFormSubmission={false}/>;
        case 'form3a': return <Form3A userId={userId} checkFormSubmission={false}/>;
        case 'form3b': return <Form3B userId={userId} checkFormSubmission={false}/>;
        case 'form3c': return <Form3C userId={userId} checkFormSubmission={false}/>;
        case 'form4a': return <Form4A userId={userId} checkFormSubmission={false}/>;
        case 'form4b': return <Form4B userId={userId} checkFormSubmission={false}/>;
        case 'form4c': return <Form4C userId={userId} checkFormSubmission={false}/>;
        case 'form4d': return <Form4D userId={userId} checkFormSubmission={false}/>;
        case 'form4e': return <Form4E userId={userId} checkFormSubmission={false}/>;
        case 'form5': return <Form5 userId={userId} checkFormSubmission={false}/>;
        case 'form6': return <Form6 userId={userId} checkFormSubmission={false}/>;
        default: return null;
    }
};
  
  if (isLoading) return <div>Loading...</div>;
  if (isError || !userProfile) return <div>Error fetching the user profile or user not found.</div>;
  const userData = userProfile.data;

    const submitIndianExaminerComments = async () => {
    try {
      await updateIndianExaminer({ id: userId, comments_by_indian: IndianExaminerComments }).unwrap();
      await updateUser({ id: userId, status: "Comments Received By Indian Examiner" }).unwrap();
      alert('Indian Examiner comments updated successfully!');
    } catch (error) {
      console.error('Failed to update Indian Examiner comments:', error);
      alert('Error updating Indian Examiner comments.');
    }
  };

  const submitForeignExaminerComments = async () => {
    try {
      await updateForeignExaminer({ id: userId, comments_by_foreign: ForeignExaminerComments }).unwrap();
      await updateUser({ id: userId, status: "Comments Received By Foreign Examiner" }).unwrap();
      alert('Foreign Examiner comments updated successfully!');
    } catch (error) {
      console.error('Failed to update Foreign Examiner comments:', error);
      alert('Error updating Foreign Examiner comments.');
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
        <p className="text-center text-gray-800 font-medium mt-1">Department : {userProfile.data.department}</p>
        <p className="text-center text-gray-800 font-medium mt-1">Status : {userProfile.data.status}</p>
        <div className="mt-6 px-6">
          <h3 className="text-2xl md:text-2xl lg:text-3xl font-semibold text-gray-700">Area of Research</h3>
          <p className="text-md md:text-lg lg:text-xl text-gray-800 mt-2 leading-relaxed">
            {userProfile.data.area_of_research || "No research area specified."}
          </p>
        </div>
      </div>
      <div className='p-20'>

      {initialState.isAdmin && <UploadForm formName='user' userId={userId} fieldName='thesis_url' buttonId='thesis_upload'/>}
      </div>

      <div>
      {["Thesis Submitted", "Comments Received By Indian Examiner", "Comments Received By Foreign Examiner", "Defence", "Defence Closed"].includes(userData.status) && (
        <div className="px-6 py-4">
          <h3 className="text-2xl md:text-2xl lg:text-3xl font-semibold text-gray-700">Examiners Details</h3>
          {/* Indian Examiner Details */}
          <div className="mt-4 bg-white p-4 shadow-md rounded-lg">
            <h4 className="text-xl font-semibold text-blue-700">Indian Examiner</h4>
            <p>Name: {userData.form4c.indian_examiner.name}</p>
            <p>Designation: {userData.form4c.indian_examiner.designation}</p>
            <p>Institute: {userData.form4c.indian_examiner.institute}</p>
            <p>Email: {userData.form4c.indian_examiner.email}</p>
            <textarea
              className="mt-2 p-2 w-full h-24 border border-gray-300 rounded-md"
              placeholder="Enter comments for the Indian Examiner"
                value={IndianExaminerComments}
                disabled={commentsFetched.indian}
                onChange={(e) => setIndianExaminerComments(e.target.value)}
            />
            {!commentsFetched.indian && (
              <AiOutlineSend
                className="text-2xl text-green-500 cursor-pointer"
                onClick={submitIndianExaminerComments}
                title="Submit Indian Examiner Comments"
              />
            )}
          </div>
          {/* Foreign Examiner Details */}
          <div className="mt-4 bg-white p-4 shadow-md rounded-lg">
            <h4 className="text-xl font-semibold text-blue-700">Foreign Examiner</h4>
            <p>Name: {userData.form4c.foreign_examiner.name}</p>
            <p>Designation: {userData.form4c.foreign_examiner.designation}</p>
            <p>Institute: {userData.form4c.foreign_examiner.institute}</p>
            <p>Email: {userData.form4c.foreign_examiner.email}</p>
            <textarea
              className="mt-2 p-2 w-full h-24 border border-gray-300 rounded-md"
              placeholder="Enter comments for the Foreign Examiner"
                value={ForeignExaminerComments}
                disabled={commentsFetched.foreign}
              onChange={(e) => setForeignExaminerComments(e.target.value)}
            />
            {!commentsFetched.foreign && (
              <AiOutlineSend
                className="text-2xl text-green-500 cursor-pointer"
                onClick={submitForeignExaminerComments}
                title="Submit Foreign Examiner Comments"
              />
            )}
          </div>
        </div>
      )}
    </div>

      
     <div className="px-4 py-6">
  <h3 className="text-2xl font-semibold text-center mb-4">Submitted Forms</h3>
  <div className="grid grid-cols-4 gap-6">
    {['form1a', 'form1b', 'form2', 'form3a', 'form3b', 'form3c', 'form4a', 'form4b', 'form4c', 'form4d', 'form4e', 'form5', 'form6'].map((form) => (
      isFormSubmitted(userProfile.data[form + '_submitted']) && (
        <div key={form} className="bg-white p-4 shadow-md rounded-lg h-24 flex items-center justify-between cursor-pointer hover:bg-blue-50 transition duration-300"
          onClick={() => setSelectedForm(form)}>
          <div className="flex items-center space-x-3">
            <AiOutlineFileText className="text-blue-500 text-5xl"/> {/* Icon representing a document or form */}
            <span className=" text-gray-800 pl-2 text-2xl">
              {`${form.toUpperCase().replace(/(\d+)/, ' $1')}`} {/* Cleaner name formatting */}
            </span>
          </div>
          <AiFillCheckCircle className="text-green-500 text-3xl"/> {/* Changed icon for visual feedback */}
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
