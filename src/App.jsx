import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";




function App() {


  return (
    <Router>
      <main className="pt-12">
        <Routes>
          <Route path="/" element={<HomeLayout />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
