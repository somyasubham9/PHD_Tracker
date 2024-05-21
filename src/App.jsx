import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import HomePage from "./app/Page/HomePage/HomePage";
import Form1ALayout from "./app/Page/Form1Page/Form1ALayout";
import Form1BLayout from "./app/Page/Form1Page/Form1BLayout";
import Form2Layout from "./app/Page/Form2Page/Form2Layout";
import Form3ALayout from "./app/Page/Form3Page/Form3ALayout";
import Form3BLayout from "./app/Page/Form3Page/Form3BLayout";
import Form3CLayout from "./app/Page/Form3Page/Form3CLayout";
import StudentList from "./app/Page/StudenList/StudentList";
import Form4ALayout from "./app/Page/Form4Page/Form4ALayout";
import Form4BLayout from "./app/Page/Form4Page/Form4BLayout";
import Form4CLayout from "./app/Page/Form4Page/Form4CLayout";
import Form4DLayout from "./app/Page/Form4Page/Form4DLayout";
import Form4ELayout from "./app/Page/Form4Page/Form4ELayout";
import Form5Layout from "./app/Page/Form5Page/Form5Layout";
import Form6Layout from "./app/Page/Form6Page/Form6Layout";
import ProfileLayout from "./app/Page/ProfileLayout";
import AuthPage from "./app/Components/Auth/Auth";
import LayoutWithNavbar from "./app/Components/NavBarLayout";
import ProtectedRoute from "./app/Components/ProtectedRoute";
import NotFound from "./app/Page/NotFound";
import {
  updateIsLoggedIn,
  updateIsAdmin,
  updateFirstName,
  updateLastName,
  updateUserEmail,
  updateUserId,
  updateDepartment,
  updateSupervisor,
  updateAreaOfResearch,
  updateStatus,
  updateform1a_submitted,
  updateform1b_submitted,
  updateform2_submitted,
  updateform3a_submitted,
  updateform3b_submitted,
  updateform3c_submitted,
  updateform4a_submitted,
  updateform4b_submitted,
  updateform4c_submitted,
  updateform4d_submitted,
  updateform4e_submitted,
  updateform5_submitted,
  updateform6_submitted,
  updateDateJoined,
  updateCreatedDate,
  updateUpdatedDate,
} from "./app/Redux/slices/userSlice";
import { useDispatch } from "react-redux";
import StudentProfile from "./app/Components/Profile/AdminProfile";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
    if (userDetails) {
      dispatch(updateIsLoggedIn(userDetails.isLoggedIn));
      dispatch(updateIsAdmin(userDetails.isAdmin));
      dispatch(updateFirstName(userDetails.firstName));
      dispatch(updateLastName(userDetails.lastName));
      dispatch(updateUserEmail(userDetails.userEmail));
      dispatch(updateUserId(userDetails.userId));
    }
  }, [dispatch]);

  return (
    <Router>
      <main className="">
        <LayoutWithNavbar />
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/studentlist" element={<StudentList />} />
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
            <Route path="/profile/:userId" element={<StudentProfile />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
