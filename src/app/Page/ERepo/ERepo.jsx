import React, { useEffect, useState } from "react";
import { useLazyGetUserListERepoQuery } from "../../Services/userServices";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import ERepoCard from "../../Components/ERepoCard/ERepoCard";

const StudentList = () => {
  const [getUserList, { data: userList, isLoading, isError }] =
    useLazyGetUserListERepoQuery();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getUserList();
  }, [getUserList]);

  useEffect(() => {
    if (userList && userList.data.length > 0) {
      setFilteredUsers(userList.data);
    }
  }, [userList]);

  const handleCardClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const handleSearch = (searchQuery) => {
    console.log(userList);
    if (!searchQuery.trim()) {
      setFilteredUsers(userList.data); // Reset to full list when search query is cleared
      return;
    }
    console.log(userList.data);
    const filtered = userList?.data?.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.roll_no.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching the user list.</p>;

  const handleNavigateToHome = () => {
    navigate("/auth");
  };

  return (
    <div className="w-full py-10 flex flex-col items-center justify-center">
      {/* Button to route to "/erepo" */}
      <button
        className="absolute top-8 right-8 text-white bg-[#FB6A55] text-bold rounded px-3 py-2 hover:scale-105 hover:bg-red-500"
        onClick={handleNavigateToHome}
      >
        Sign In
      </button>
      <div className="w-full flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold text-center mb-6 text-[#443E3E]">E-Repository</h2>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="my-12 w-full flex justify-center items-center">
        <div className="grid grid-cols-4 gap-24">
          {filteredUsers.map((user) => (
            <ERepoCard key={user.id} user={user} onClick={handleCardClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentList;
