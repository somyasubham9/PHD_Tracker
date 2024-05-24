import React, { useEffect, useState } from "react";
import backgroundImage from "../../../assets/login.jpg";
import { useUserRegisterMutation } from "../../Services/userServices";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [userType, setUserType] = useState("");

  const [registerUser, registerUserResponse] = useUserRegisterMutation();

  const [supervisorList, setSupervisorList] = useState([]);

  useEffect(() => {
    const fetchSupervisorList = async () => {
      const res = await axios.get("http://127.0.0.1:8000/api/professor/list/");
      console.log(res.data.data);
      setSupervisorList(res.data.data);
    };
    fetchSupervisorList();
  }, []);

  const handleSignup = async () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("department", department);
    formData.append("roll_no", rollNo);
    formData.append("supervisor", supervisor);
    formData.append("user_type", userType);

    const jsonData = Object.fromEntries(formData.entries());

    await registerUser(jsonData).then((res) => {
      toast.success("Registration Successfull");
      console.log(res);
    });
    // await updateUser()
    console.log("Handling signup");
    // Add your signup logic here
  };

  return (
    <div className="flex min-h-screen">
      {/* Image Container */}
      <div className="w-1/2">
        <img
          src={backgroundImage}
          alt="Login"
          className="object-cover w-full h-full"
        />
      </div>
      {/* Form Container */}
      <div className="flex items-center justify-center w-1/2 p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Button to route to "/erepo" */}
          <h2 className="text-3xl font-bold text-center">Sign Up</h2>

          <>
            <div className="mt-6">
              <input
                type="text"
                placeholder="Enter your First Name"
                className="w-full px-4 py-3 border rounded"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="mt-6">
              <input
                type="text"
                placeholder="Enter your Last Name"
                className="w-full px-4 py-3 border rounded"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="mt-6">
              <input
                type="text"
                placeholder="Enter your Department"
                className="w-full px-4 py-3 border rounded"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
            </div>
            <div className="mt-6">
              <input
                type="text"
                placeholder="Enter your Roll Number"
                className="w-full px-4 py-3 border rounded"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                required
              />
            </div>

            <div className="mt-6">
              <select
                className="w-full px-4 py-3 border rounded"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                required
              >
                <option value="">Select User Type</option>
                <option value="professor">Professor</option>
                <option value="scholar">Scholar</option>
              </select>
            </div>
            <div className="mt-6">
              <select
                className="w-full px-4 py-3 border rounded"
                value={supervisor}
                onChange={(e) => {
                  setSupervisor(e.target.value);
                }}
                disabled={userType === "professor"}
                required
              >
                <option value="">Select Supervisor</option>
                {supervisorList.map((supervisor) => (
                  <option key={supervisor.id} value={supervisor.id}>
                    {supervisor.first_name} {supervisor.last_name}
                  </option>
                ))}
              </select>
            </div>
          </>
          <div className="mt-6">
            <input
              type="email"
              placeholder="Enter your Email"
              className="w-full px-4 py-3 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mt-4">
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full px-4 py-3 border rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="w-full py-3 mt-6 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={handleSignup}
          >
            {"Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
