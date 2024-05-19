import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateAreaOfResearch } from "../../Redux/slices/userSlice"
import {
  useUserUpdateMutation
} from "../../Services/userServices";

const SocialProfile = () => {
  const initialState = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);
  const [researchArea, setResearchArea] = useState(initialState.areaOfResearch || '');
  
  const [updateUser, updateUserResponse] = useUserUpdateMutation();

  const handleSave = async () => {
    try {
      console.log(researchArea)
      console.log(typeof(initialState.userId));
      const result = await updateUser({ area_of_research: researchArea }, initialState.userId);
      if (result.error) {
        console.log('Error updating user:', result.error);
      } else {
        dispatch(updateAreaOfResearch(researchArea));
        setEditMode(false);
        console.log('Updated successfully!');
      }
    } catch (error) {
      console.error('Failed to update:', error);
    }
  };
  console.log(initialState);
  return (
    <div className="h-screen w-full">
      {/* Cover and Profile Image */}
      <div className="relative">
        {/* Using a more dynamic background image or a subtle gradient */}
        <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 h-48 w-full object-cover lg:h-56">
          {/* Placeholder for a more engaging cover image */}
        </div>
        <img
          src="https://i.pinimg.com/736x/f5/97/55/f59755a3995d1d20d1daa8d98c3ba5ac.jpg"
          alt="Profile"
          className="absolute left-1/2 object-cover transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border-8 border-black shadow-xl"
          style={{ top: '100%' }}
        />
      </div>
      
      {/* Profile Details */}
      <div className="px-4 pt-32 pb-6 bg-white shadow-xl rounded-lg mx-auto mt-6 lg:mt-4">
        <h1 className="text-4xl font-bold text-center mb-4 text-blue-700">{initialState.firstName + " " +initialState.lastName}</h1>
        <p className="text-center text-lg text-gray-600">{initialState.userEmail}</p>
        <p className="text-center text-gray-600 mt-1">Bachelor of IT</p>
        
        <div className="flex justify-center space-x-6 mt-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-lg px-4 py-2 rounded-full shadow">Student</span>
          <span className="inline-block bg-green-100 text-green-800 text-lg px-4 py-2 rounded-full shadow">Tech Enthusiast</span>
        </div>

        <div className="mt-6 px-6">
        <h3 className="text-2xl md:text-2xl lg:text-4xl font-semibold text-gray-700">Areas Of Research</h3>
        {editMode ? (
          <textarea
            className="text-md md:text-lg lg:text-xl text-gray-800 mt-2 leading-relaxed"
            value={researchArea}
            onChange={(e) => setResearchArea(e.target.value)}
          />
        ) : (
          <p className="text-md md:text-lg lg:text-xl text-gray-800 mt-2 leading-relaxed">
            {researchArea}
          </p>
        )}
        {editMode ? (
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
        ) : (
          <button onClick={() => setEditMode(true)} className="px-4 py-2 bg-green-500 text-white rounded">Edit</button>
        )}
      </div>
      </div>
    </div>
  );
};

export default SocialProfile;
