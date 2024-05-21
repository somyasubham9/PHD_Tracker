import React, { useEffect, useState } from 'react';
import { useLazyGetUserListQuery } from "../../Services/userServices";
import StudentCard from "../../Components/StudentCard/StudentCard";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { useNavigate } from 'react-router-dom';

const StudentList = () => {
  const [getUserList, { data: userList, isLoading, isError }] = useLazyGetUserListQuery();
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
    console.log(searchQuery);
      if (!searchQuery.trim()) {
      setFilteredUsers(userList.data); // Reset to full list when search query is cleared
      return;
      }
    console.log(userList.data);
    const filtered = userList?.data?.filter(user =>
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.roll_no.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

    if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching the user list.</p>;

  return (
    <div className="w-full py-10 flex flex-col items-center justify-center">
      <div className="w-full flex items-center justify-center">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="my-12 w-full flex justify-center items-center">
        <div className="grid grid-cols-4 gap-24">
          {filteredUsers.map(user => (
            <StudentCard key={user.id} user={user} onClick={handleCardClick} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentList;
