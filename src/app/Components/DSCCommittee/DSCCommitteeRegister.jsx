import React, { useState } from "react";
import backgroundImage from "../../../assets/login.jpg";
// import { useDscCommitteeRegisterMutation } from "../../Services/dscCommitteeServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const DSCCommitteeRegister = () => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [designation, setDesignation] = useState("");
    const [institute, setInstitute] = useState("");
    const [profileUrl, setProfileUrl] = useState("");

    // const [registerDSCCommittee, registerDSCCommitteeResponse] = useDscCommitteeRegisterMutation();

    const handleSignup = async () => {
        const formData = new FormData();
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("email", email);
        formData.append("designation", designation);
        formData.append("institute", institute);
        formData.append("profile_url", profileUrl);

        const jsonData = Object.fromEntries(formData.entries());

        try {
            const token = sessionStorage.getItem("access");
            if (!token) {
                console.error("No access token found in session storage");
                return;
            }
            const response = await axios.post("http://127.0.0.1:8000/api/dsc/committee/",
                 jsonData ,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const responseData = response.data; // Assuming response is already JSON parsed
            console.log(responseData);
            if (responseData["status code"] === 200) {
                toast.success(responseData.message || "Registration Successful");
            } else {
                toast.error(responseData.message || "Registration Failed! Try Again");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            toast.error("Error submitting form. Please try again later.");
        }
    };

    return (
        <div className="flex h-[90vh]">
            {/* Image Container */}
            <div className="w-1/2">
                <img
                    src={backgroundImage}
                    alt="SignUp"
                    className="object-cover w-full h-full"
                />
            </div>
            {/* Form Container */}
            <div className="flex items-center justify-center w-1/2 px-12 py-6 bg-white">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center">DSC Committee Registration</h2>

                    <div className="mt-4">
                        <input
                            type="text"
                            placeholder="Enter your First Name"
                            className="w-full px-4 py-3 border rounded"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <input
                            type="text"
                            placeholder="Enter your Last Name"
                            className="w-full px-4 py-3 border rounded"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-4">
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
                            type="text"
                            placeholder="Enter your Designation"
                            className="w-full px-4 py-3 border rounded"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <input
                            placeholder="Enter your Institute"
                            className="w-full px-4 py-3 border rounded"
                            value={institute}
                            onChange={(e) => setInstitute(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <input
                            type="url"
                            placeholder="Enter your Profile URL"
                            className="w-full px-4 py-3 border rounded"
                            value={profileUrl}
                            onChange={(e) => setProfileUrl(e.target.value)}
                        />
                    </div>
                    <button
                        className="w-full py-3 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
                        onClick={handleSignup}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DSCCommitteeRegister;
