import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage  from "./app/Page/HomePage/HomePage";
import Navbar from "./app/Components/Navbar";
import Form1ALayout from "./app/Page/Form1Page/Form1ALayout";
import Form1BLayout from "./app/Page/Form1Page/Form1BLayout";
import Form2Layout from "./app/Page/Form2Page/Form2Layout";
import Form3ALayout from "./app/Page/Form3Page/Form3ALayout";
import Form3BLayout from "./app/Page/Form3Page/Form3BLayout";
import Form3CLayout from "./app/Page/Form3Page/Form3CLayout";
import Form4ALayout from "./app/Page/Form4Page/Form4ALayout";
import Form4BLayout from "./app/Page/Form4Page/Form4BLayout";
import Form4CLayout from "./app/Page/Form4Page/Form4CLayout";
import Form4DLayout from "./app/Page/Form4Page/Form4DLayout";
import Form4ELayout from "./app/Page/Form4Page/Form4ELayout";
import Form5Layout from "./app/Page/Form5Page/Form5Layout";
import Form6Layout from "./app/Page/Form6Page/Form6Layout";
import ProfileLayout from "./app/Page/ProfileLayout";
import AuthPage from "./app/Components/Auth/Auth";

function App() {
  return (
    <Router>
      <Navbar/>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form1A" element={<Form1ALayout />} />
        <Route path="/form1B" element={<Form1BLayout />} />
        <Route path="/form2" element={<Form2Layout />} />
        <Route path="/form3A" element={<Form3ALayout />} />
        <Route path="/form3B" element={<Form3BLayout />} />
        <Route path="/form3C" element={<Form3CLayout />} />
        <Route path="/form4A" element={<Form4ALayout />} />
        <Route path="/form4B" element={<Form4BLayout />} />
        <Route path="/form4C" element={<Form4CLayout />} />
        <Route path="/form4D" element={<Form4DLayout />} />
        <Route path="/form4E" element={<Form4ELayout />} />
        <Route path="/form5" element={<Form5Layout />} />
        <Route path="/form6" element={<Form6Layout />} />
        <Route path="/profile" element={<ProfileLayout />} />
        <Route path="/auth" element={<AuthPage />} />
        </Routes>
    </Router>
  );
}

export default App;
