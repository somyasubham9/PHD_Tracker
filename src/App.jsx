import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage  from "./app/Page/HomePage/HomePage";
import Navbar from "./app/Components/Navbar/Navbar";
import Form1ALayout from "./app/Page/Form1Page/Form1ALayout";
import Form1BLayout from "./app/Page/Form1Page/Form1BLayout";
import Form2Layout from "./app/Page/Form2Page/Form2Layout";
import Form3ALayout from "./app/Page/Form3Page/Form3ALayout";
import Form3BLayout from "./app/Page/Form3Page/Form3BLayout";
import Form3CLayout from "./app/Page/Form3Page/Form3CLayout";
import StudentList from "./app/Page/StudenList/StudentList";


function App() {


  return (
    <Router>
      <main className="">
      <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/studenlist" element={<StudentList />} />
          <Route path="/form1A" element={<Form1ALayout />} />
          <Route path="/form1B" element={<Form1BLayout />} />
          <Route path="/form2" element={<Form2Layout />} />
          <Route path="/form3A" element={<Form3ALayout />} />
          <Route path="/form3B" element={<Form3BLayout />} />
          <Route path="/form3C" element={<Form3CLayout />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
