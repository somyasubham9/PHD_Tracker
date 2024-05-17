import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form1ALayout from "./app/Page/Form1Page/Form1ALayout";




function App() {


  return (
    <Router>
      <main className="pt-12">
        <Routes>
          <Route path="/" element={<Form1ALayout />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
