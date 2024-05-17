import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form1ALayout from "./app/Page/Form1Page/Form1ALayout";
import Form1BLayout from "./app/Page/Form1Page/Form1BLayout";
import Form2Layout from "./app/Page/Form2Page/Form2Layout";
import Form3ALayout from "./app/Page/Form3Page/Form3ALayout";
import Form3BLayout from "./app/Page/Form3Page/Form3BLayout";
import Form3CLayout from "./app/Page/Form3Page/Form3CLayout";


function App() {


  return (
    <Router>
      <main className="pt-12">
        <Routes>
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
