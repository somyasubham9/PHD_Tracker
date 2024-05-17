import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage  from "./app/Page/HomePage/HomePage";
import Navbar from "./app/Components/Navbar";
function App() {


  return (
    <Router>
      <main className="pt-12">
      <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
