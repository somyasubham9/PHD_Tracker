import React from 'react';

const SocialProfile = () => {
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
        <h1 className="text-4xl font-bold text-center mb-4 text-blue-700">Jake Harper</h1>
        <p className="text-center text-lg text-gray-600">jake@gmail.com</p>
        <p className="text-center text-gray-600 mt-1">Bachelor of IT</p>
        
        <div className="flex justify-center space-x-6 mt-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-lg px-4 py-2 rounded-full shadow">Student</span>
          <span className="inline-block bg-green-100 text-green-800 text-lg px-4 py-2 rounded-full shadow">Tech Enthusiast</span>
        </div>

        <div className="mt-6 px-6">
          <h3 className="text-2xl md:text-2xl lg:text-4xl font-semibold text-gray-700">Areas Of Research</h3>
          <p className="text-md md:text-lg lg:text-xl text-gray-800 mt-2 leading-relaxed">
            Jake is a passionate tech enthusiast and Bachelor of IT graduate from Life Partners University. 
            He is currently working as the CBO at Life Partners, focusing on innovative tech solutions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialProfile;
