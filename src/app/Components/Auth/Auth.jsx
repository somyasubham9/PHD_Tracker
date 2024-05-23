import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../../assets/login.jpg";
import {
  useUserRegisterMutation,
  useUserLoginMutation,
  useUserUpdateMutation,
} from "../../Services/userServices";
import { useDispatch } from "react-redux";
import {
  updateIsLoggedIn,
  updateIsAdmin,
  updateFirstName,
  updateLastName,
  updateUserEmail,
  updateSupervisor,
  updateUserId,
  updateStatus,
  updateDepartment,
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
  updateAreaOfResearch,
  updateRollNo,
} from "../../Redux/slices/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup forms
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [supervisor, setSupervisor] = useState("");

  const [registerUser, registerUserResponse] = useUserRegisterMutation();

  const [loginUser, loginUserResponse] = useUserLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (registerUserResponse.isSuccess) {
      setIsLogin(true);
      console.log("User succesfully created");
    }

    if (loginUserResponse.isSuccess) {
      sessionStorage.setItem("access", loginUserResponse.data.access);
      sessionStorage.setItem("refresh", loginUserResponse.data.refresh);
      //   console.log(loginUserResponse);

      // Storing user details
      const userDetails = {
        isLoggedIn: true,
        isAdmin: loginUserResponse.data.user.is_superuser,
        firstName: loginUserResponse.data.user.first_name,
        lastName: loginUserResponse.data.user.last_name,
        userEmail: loginUserResponse.data.user.email,
        userId: loginUserResponse.data.user.id,
      };

      sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
      console.log(loginUserResponse.data.user);
      dispatch(updateIsLoggedIn(true));
      dispatch(updateCreatedDate(loginUserResponse.data.user.created_at));
      dispatch(updateUpdatedDate(loginUserResponse.data.user.updated_at));
      dispatch(updateDateJoined(loginUserResponse.data.user.date_joined));
      dispatch(updateFirstName(loginUserResponse.data.user.first_name));
      dispatch(updateLastName(loginUserResponse.data.user.last_name));
      dispatch(updateUserEmail(loginUserResponse.data.user.email));
      dispatch(updateUserId(loginUserResponse.data.user.id));
      dispatch(updateStatus(loginUserResponse.data.user.status));
      dispatch(updateDepartment(loginUserResponse.data.user.department));
      dispatch(updateSupervisor(loginUserResponse.data.user.supervisor));
      dispatch(
        updateAreaOfResearch(loginUserResponse.data.user.area_of_research)
      );
      dispatch(updateRollNo(loginUserResponse.data.user.roll_no));
      // Assuming form submission statuses are included in the response
      dispatch(
        updateform1a_submitted(loginUserResponse.data.user.form1a_submitted)
      );
      dispatch(
        updateform1b_submitted(loginUserResponse.data.user.form1b_submitted)
      );
      dispatch(
        updateform2_submitted(loginUserResponse.data.user.form2_submitted)
      );
      dispatch(
        updateform3a_submitted(loginUserResponse.data.user.form3a_submitted)
      );
      dispatch(
        updateform3b_submitted(loginUserResponse.data.user.form3b_submitted)
      );
      dispatch(
        updateform3c_submitted(loginUserResponse.data.user.form3c_submitted)
      );
      dispatch(
        updateform4a_submitted(loginUserResponse.data.user.form4a_submitted)
      );
      dispatch(
        updateform4b_submitted(loginUserResponse.data.user.form4b_submitted)
      );
      dispatch(
        updateform4c_submitted(loginUserResponse.data.user.form4c_submitted)
      );
      dispatch(
        updateform4d_submitted(loginUserResponse.data.user.form4d_submitted)
      );
      dispatch(
        updateform4e_submitted(loginUserResponse.data.user.form4e_submitted)
      );
      dispatch(
        updateform5_submitted(loginUserResponse.data.user.form5_submitted)
      );
      dispatch(
        updateform6_submitted(loginUserResponse.data.user.form6_submitted)
      );

      //isSuperUser for isAdmin
      dispatch(updateIsAdmin(loginUserResponse.data.user.is_superuser));

      //Navigate
      navigate("/");
      
    }
    // navigate()
  }, [registerUserResponse.isSuccess, loginUserResponse.isSuccess]);

  const handleLogin = async () => {
    // Logic for handling login
    console.log("Handling login");
    // Add your login logic here
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const jsonData = Object.fromEntries(formData.entries());

    await loginUser(jsonData).then((res) => {
      console.log(res);
      toast.success('Login Successfull')
    });

    console.log("Handling Sign In");
  };

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

    const jsonData = Object.fromEntries(formData.entries());

    await registerUser(jsonData).then((res) => {
      toast.success("Registration Successfull");
      console.log(res);
    });
    // await updateUser()
    console.log("Handling signup");
    // Add your signup logic here
  };

  const switchForm = () => {
    setIsLogin(!isLogin);
  };

  // Function to handle the button click and route to "/erepo"
  const handleNavigateToErepo = () => {
    navigate("/erepo");
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
          <button
            className="absolute top-8 right-8 text-white bg-[#FB6A55] text-bold rounded px-3 py-2 hover:scale-105 hover:bg-red-500"
            onClick={handleNavigateToErepo}
          >
            E-Repository
          </button>

          <h2 className="text-3xl font-bold text-center">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          {!isLogin && (
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
                <input
                  type="text"
                  placeholder="Enter your Supervisor"
                  className="w-full px-4 py-3 border rounded"
                  value={supervisor}
                  onChange={(e) => setSupervisor(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          <div className="mt-6">
            <input
              type="text"
              placeholder="Enter your Roll Number"
              className="w-full px-4 py-3 border rounded"
              value={rollNo}
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

          {!isLogin && (
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
          )}

          {isLogin && (
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 form-checkbox"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-blue-500">
                Forgot Password?
              </a>
            </div>
          )}

          <button
            className="w-full py-3 mt-6 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={isLogin ? handleLogin : handleSignup}
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>

          <p className="mt-6 text-sm text-center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button onClick={switchForm} className="text-blue-500 underline">
              {isLogin ? " Sign up" : " Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
