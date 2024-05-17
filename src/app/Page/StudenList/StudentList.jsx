import React from 'react'
import StudentCard from "../../Components/StudentCard/StudentCard";
import SearchBar from "../../Components/SearchBar/SearchBar";
const StudentList = () => {
  return (
    <div className="w-full py-10 flex flex-col items-center justify-center">
    <div className="w-full flex items-center justify-center">
    <SearchBar/>
    </div>
    <div className="my-12 w-full flex justify-center items-center">
      <div className="grid grid-cols-4 gap-24">
        <StudentCard />
        <StudentCard />
        <StudentCard />
        <StudentCard />
      </div>
    </div>
    </div>
  )
}

export default StudentList