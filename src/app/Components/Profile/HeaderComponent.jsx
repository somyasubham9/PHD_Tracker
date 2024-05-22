import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEdit } from "react-icons/ai";
import { updateAreaOfResearch } from "../../Redux/slices/userSlice";
import { useUserUpdateMutation, useLazyGetUserProfileQuery } from "../../Services/userServices";

const SocialProfile = () => {
  const initialState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [researchArea, setResearchArea] = useState('');

  const [getUserProfile, { data: userProfile, isSuccess }] = useLazyGetUserProfileQuery();
  const [updateUser] = useUserUpdateMutation();

  useEffect(() => {
    if (initialState.userId) {
      getUserProfile(initialState.userId);
    }
  }, [initialState.userId, getUserProfile]);

  useEffect(() => {
    if (isSuccess && userProfile) {
      setResearchArea(userProfile.data.area_of_research || '');
      dispatch(updateAreaOfResearch(userProfile.area_of_research));
    }
  }, [userProfile, isSuccess, dispatch]);

  const handleSave = async () => {
    try {
      const result = await updateUser({ id: initialState.userId, area_of_research: researchArea });
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
  }
  console.log(initialState);
  return (
    <div className="h-screen w-full">
      <div className="relative">
        <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 h-48 w-full object-cover lg:h-56"></div>
        <img
          src="https://i.pinimg.com/736x/f5/97/55/f59755a3995d1d20d1daa8d98c3ba5ac.jpg"
          alt="Profile"
          className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border-8 border-white shadow-xl"
          style={{ top: '100%' }}
        />
      </div>
      
      <div className="px-4 pt-32 pb-6 bg-white shadow-xl rounded-lg mx-auto mt-6 lg:mt-4">
        <h1 className="text-4xl font-bold text-center mb-4 text-blue-700">{initialState.firstName + " " + initialState.lastName}</h1>
        <p className="text-center text-lg text-gray-600">{initialState.userEmail}</p>
        <p className="text-center text-gray-600 mt-1">{initialState.status}</p>
        <div className="flex justify-center space-x-6 mt-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-lg px-4 py-2 rounded-full shadow">{initialState.roll_no}</span>
          <span className="inline-block bg-green-100 text-green-800 text-lg px-4 py-2 rounded-full shadow">{initialState.supervisor}</span>
        </div>

        <div className="mt-6 px-6">
          <h3 className="text-2xl md:text-2xl lg:text-3xl font-semibold text-gray-700">
            Areas Of Research
            {!editMode && (
              <AiFillEdit className="inline ml-2 cursor-pointer p-1 bg-blue-300 rounded-full" onClick={() => setEditMode(true)} />
            )}
          </h3>
          {editMode ? (
            <textarea
              className="text-md md:text-lg lg:text-xl text-gray-800 mt-2 leading-relaxed border border-gray-300 rounded p-2 w-full"
              value={researchArea}
              onChange={(e) => setResearchArea(e.target.value)}
            />
          ) : (
            <p className="text-md md:text-lg lg:text-xl text-gray-800 mt-2 leading-relaxed">
              {researchArea || "No research area specified. Click edit to add your research interests."}
            </p>
          )}
          {editMode && (
            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded mt-2">Save</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialProfile;
