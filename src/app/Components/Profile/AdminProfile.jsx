import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useLazyGetUserProfileQuery,
  useIndianUpdateMutation,
  useForeignUpdateMutation,
  useStatusUpdateMutation,
  useExaminerUpdateMutation,
  useDscCommitteeUpdateMutation,
  useUserUpdateMutation,
} from "../../Services/userServices";
import {
  AiFillCheckCircle,
  AiFillEdit,
  AiFillEye,
  AiOutlineCheckCircle,
  AiOutlineClose,
  AiOutlineFileText,
  AiOutlineSend,
} from "react-icons/ai";
import Form1A from "../Form1/Form1A";
import Form1B from "../Form1/Form1B";
import Form2 from "../Form2/Form2";
import Form3A from "../Form3/Form3A";
import Form3B from "../Form3/Form3B";
import Form3C from "../Form3/Form3C";
import Form4A from "../Form4/Form4A";
import Form4B from "../Form4/Form4B";
import Form4C from "../Form4/Form4C";
import Form4D from "../Form4/Form4D";
import Form4E from "../Form4/Form4E";
import Form6 from "../Form6/Form6";
import Form5 from "../Form5/Form5";
import UploadForm from "../UploadForm/uploadForm";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import { updateAreaOfResearch } from "../../Redux/slices/userSlice";

const StudentProfile = () => {
  const initialState = useSelector((state) => state.user);
  let { userId } = useParams(); // Extract userId from URL
  if (!userId) {
    userId = initialState.userId;
  }
  const [getUserProfile, { data: userProfile, isLoading, isError, isFetched }] =
    useLazyGetUserProfileQuery();
  const [selectedForm, setSelectedForm] = useState(null);
  const [updateUser] = useStatusUpdateMutation();
  const [updateExaminer] = useExaminerUpdateMutation();
  const [updateDscCommittee] = useDscCommitteeUpdateMutation();
  const [updateResearchUser] = useUserUpdateMutation();
  const [IndianExaminerComments, setIndianExaminerComments] = useState(null);
  const [ForeignExaminerComments, setForeignExaminerComments] = useState(null);
  const [indianExaminerList, setIndianExaminerList] = useState([]);
  const [foreignExaminerList, setForeignExaminerList] = useState([]);
  const [selectedIndianExaminer, setSelectedIndianExaminer] = useState("");
  const [selectedForeignExaminer, setSelectedForeignExaminer] = useState("");
  const [updateIndianExaminer] = useIndianUpdateMutation();
  const [updateForeignExaminer] = useForeignUpdateMutation();
  const [studentIndianExaminer, setStudentIndianExaminer] = useState()
  const [studentForeignExaminer, setStudentForeignExaminer] = useState()
  const [isIndianExaminer, setIsIndianExaminer] = useState(false);
  const [isForeignExaminer, setIsForeignExaminer] = useState(false);
  const [commentsFetched, setCommentsFetched] = useState({
    indian: false,
    foreign: false,
  });
  const [initialCommentsLoaded, setInitialCommentsLoaded] = useState(false);
  const [selectedDscCommittee, setSelectedDscCommittee] = useState([]);
  const [dscCommitteeList, setDscCommitteeList] = useState([]);
  const [isDscCommitteeSet, setIsDscCommitteeSet] = useState(false);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [researchArea, setResearchArea] = useState('');


  const [isModalOpen, setIsModalOpen] = useState(false);
  // Fetch user profile when component mounts or userId changes

  useEffect(() => {
    if (initialState.userId) {
      getUserProfile(initialState.userId);
    }
  }, [initialState.userId, getUserProfile]);

  useEffect(() => {
    if (!isLoading && userProfile) {
      setResearchArea(userProfile.data.area_of_research || '');
      dispatch(updateAreaOfResearch(userProfile.area_of_research));
    }
  }, [userProfile, isLoading, dispatch])
  
  useEffect(() => {
    if (userId) {
      getUserProfile(userId)
        .unwrap()
        .then((res) => {
          let dsc_committee = res.data.dsc_committee;
          if (dsc_committee.length !== 0) {
            let dsc_arr = [];
            dsc_committee.forEach((val) => {
              dsc_arr = [...dsc_arr, val.id];
            })
            setSelectedDscCommittee(dsc_arr);
            setIsDscCommitteeSet(true);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch user profile:", error);
        });
    }
    
  }, [userId, getUserProfile]);




  useEffect(() => {
    const fetchDSCCommitteeList = async () => {
      const res = await axios.get("http://127.0.0.1:8000/api/professor/list/");
      // console.log(res.data.data);
      setDscCommitteeList(res.data.data);
    };
    fetchDSCCommitteeList();
  }, []);

  const isFormSubmitted = (submissionDate) =>
    submissionDate !== null && submissionDate !== undefined;

  useEffect(() => {
    if (userId) {
      getUserProfile(userId).then((response) => {
        if (response?.data) {
          const { comments_by_indian, comments_by_foreign } =
            response.data.data;
          setIndianExaminerComments(comments_by_indian || "");
          setForeignExaminerComments(comments_by_foreign || "");
          setCommentsFetched({
            indian: !!comments_by_indian,
            foreign: !!comments_by_foreign,
          });
        }
      });
      getUserProfile(userId).then((response) => {
        if (response?.data) {
          if (response.data.data.indian_examiner) {
            setStudentIndianExaminer(response.data.data.indian_examiner)
            setIsIndianExaminer(true);
          }
          if (response.data.data.foreign_examiner) {
            setStudentForeignExaminer(response.data.data.foreign_examiner)
            setIsForeignExaminer(true);
          }

        }
      })
    }
    const getExaminerList = async () => {
      const token = sessionStorage.getItem("access");
      if (!token) {
        console.error("No access token found in session storage");
        return;
      }
      const res = await axios.get("http://127.0.0.1:8000/api/examiner/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIndianExaminerList(res.data.data.indian);
      setForeignExaminerList(res.data.data.foreign);
    }
    getExaminerList();
  }, [userId, getUserProfile, isIndianExaminer, isForeignExaminer]);

  const renderFormComponent = () => {
    switch (selectedForm) {
      case "form1a":
        return <Form1A userId={userId} />;
      case "form1b":
        return <Form1B userId={userId} />;
      case "form2":
        return <Form2 userId={userId} />;
      case "form3a":
        return <Form3A userId={userId} />;
      case "form3b":
        return <Form3B userId={userId} />;
      case "form3c":
        return <Form3C userId={userId} />;
      case "form4a":
        return <Form4A userId={userId} />;
      case "form4b":
        return <Form4B userId={userId} />;
      case "form4c":
        return <Form4C userId={userId} />;
      case "form4d":
        return <Form4D userId={userId} />;
      case "form4e":
        return <Form4E userId={userId} />;
      case "form5":
        return <Form5 userId={userId} />;
      case "form6":
        return <Form6 userId={userId} />;
      default:
        return null;
    }
  };

  if (isLoading) return <div>Loading...</div>;
  // console.log(isError);
  // console.log(userProfile);

  if (isError || !userProfile)
    return <div>Error fetching the user profile or user not found.</div>;
  const userData = userProfile.data;

  const submitIndianExaminerComments = async () => {
    try {
      await updateIndianExaminer({
        id: userId,
        comments_by_indian: IndianExaminerComments,
      }).unwrap();
      await updateUser({
        id: userId,
        status: "Comments Received By Indian Examiner",
      }).unwrap();
      toast.success("Indian Examiner comments updated successfully!");
      setCommentsFetched((prevState) => ({
        ...prevState,  // Spread the previous state to keep the other values
        indian: true // Update the value of indian
      }));
    } catch (error) {
      // console.error("Failed to update Indian Examiner comments:", error);
      toast.error("Error updating Indian Examiner comments.");
    }
  };

  const submitForeignExaminerComments = async () => {
    try {
      await updateForeignExaminer({
        id: userId,
        comments_by_foreign: ForeignExaminerComments,
      }).unwrap();
      await updateUser({
        id: userId,
        status: "Comments Received By Foreign Examiner",
      }).unwrap();
      toast.success("Foreign Examiner comments updated successfully!");
      setCommentsFetched((prevState) => ({
        ...prevState,  // Spread the previous state to keep the other values
        foreign: true  // Update the value of indian
      }));
    } catch (error) {
      console.error("Failed to update Foreign Examiner comments:", error);
      toast.error("Error updating Foreign Examiner comments.");
    }
  };

  const assignIndianExaminer = async (e) => {
    try {
      await updateExaminer({
        id: userId,
        body: {
          indian_examiner_id: selectedIndianExaminer,
        }
      }).unwrap();
      toast.success("Indian Examiner assigned successfully!");
      setIsIndianExaminer(true);
      await updateUser({ id: userId, status: "Indian Examiner Assigned" }).unwrap();
    } catch (error) {
      console.error("Failed to assign Indian Examiner:", error);
      toast.error("Error assigning Indian Examiner.");
    }
  };

  const assignForeignExaminer = async (e) => {
    try {
      await updateExaminer({
        id: userId,
        body: {
          foreign_examiner_id: selectedForeignExaminer,
        }
      }).unwrap();
      toast.success("Foreign Examiner assigned successfully!");
      setIsForeignExaminer(true);
      await updateUser({ id: userId, status: "Foreign Examiner Assigned" }).unwrap();
    } catch (error) {
      console.error("Failed to assign Foreign Examiner:", error);
      toast.error("Error assigning Foreign Examiner.");
    }
  };

  const handleDscCommitteeChange = (e) => {
    // console.log(e);
    // const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedDscCommittee(e);
  };

  const submitDscCommittee = async () => {
    // Handle submission logic here, e.g., update user profile with selected committee
    // This function is called when the user clicks on the submit button
    console.log("Selected DSC Committee:", selectedDscCommittee);
    let dsc_committee = [];
    selectedDscCommittee.forEach((value) => {
      dsc_committee = [...dsc_committee, value];
    }
    );
    await updateDscCommittee({
      id: userId,
      body: {
        dsc_committee: dsc_committee,
      }
    }).unwrap();
    setIsDscCommitteeSet(true);
    toast.success("Dsc committee list submitted successfully")

    // Update the UI to reflect the selected committee
  };

  // useEffect(() => {
  //   if (initialState.userId) {
  //     getUserProfile(initialState.userId);
  //   }
  // }, [initialState.userId, getUserProfile]);


  const handleSave = async () => {
    try {
      const result = await updateResearchUser({ id: initialState.userId, area_of_research: researchArea });
      if (result.error) {
        console.log('Error updating user:', result.error);
      } else {
        dispatch(updateAreaOfResearch(researchArea));
        setEditMode(false);
        toast.success('Updated successfully!');
      }
    } catch (error) {
      toast.error('Failed to update:', error);
    }
  }

  return (
    <div className="h-screen w-full">
      <div className="relative">
        <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 h-48 w-full object-cover lg:h-56"></div>
        <img
          src={
            userProfile.profile_pic ||
            "https://i.pinimg.com/736x/f5/97/55/f59755a3995d1d20d1daa8d98c3ba5ac.jpg"
          }
          alt="Profile"
          className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border-8 border-white shadow-xl"
          style={{ top: "100%" }}
        />
      </div>

      <div className="px-4 pt-32 pb-6 bg-white shadow-xl rounded-lg mx-auto mt-6 lg:mt-4">
        {userProfile.data.first_name && userProfile.data.last_name && (<h1 className="text-4xl font-bold text-center mb-4 text-blue-700">
          {userProfile.data.first_name} {userProfile.data.last_name}
        </h1>)}
        <p className="text-center text-lg text-gray-600">
          {userProfile.data.email}
        </p>
        {userProfile.data.department && (<p className="text-center text-gray-600">
          {userProfile.data.department}
        </p>)}
        {userProfile.data.supervisor &&(<p className="text-center text-gray-600">
          Guided by {userProfile.data.supervisor.first_name} {userProfile.data.supervisor.last_name}
        </p>)}
        {userProfile.data.status && (<p className="text-center text-gray-800 font-medium mt-1">
          Status : {userProfile.data.status}
        </p>)}
        <p className="text-center text-gray-600">
          {userProfile.data.user_type === 'admin' ? `Administrator` : userProfile.data.user_type === 'co-admin' ? `Sub-Administrator` : userProfile.data.user_type === 'professor' ? `Guide` : `Scholar`}
        </p>
        {userProfile.data.user_type === 'scholar' && (<div className="px-4 py-6">
          <h3 className="text-2xl font-semibold text-center mb-4">DSC Committee</h3>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <CustomDropdown
              options={dscCommitteeList}
              selectedValues={selectedDscCommittee}
              onChange={handleDscCommitteeChange}
              isSet={isDscCommitteeSet || (initialState.userType === 'professor' || initialState.userType === 'scholar')}
            />
            { !isDscCommitteeSet && userProfile.data.user_type === 'scholar' && (initialState.userType === 'admin' || initialState.userType === 'co-admin') && (<button
              className="mt-2 p-2 bg-blue-600 text-white rounded-md"
              onClick={submitDscCommittee}
            >
              Submit DSC Committee
            </button>)}
          </div>
        </div>)}
        {userProfile.data.user_type === 'scholar' && (<div className="mt-6 px-6">
          <h3 className="text-2xl md:text-2xl lg:text-3xl font-semibold text-gray-700">
            Areas Of Research
            {!editMode && initialState.userType === 'scholar' && (
              <AiFillEdit className="inline ml-2 cursor-pointer p-1 bg-blue-300 rounded-full" onClick={() => setEditMode(true)} />
            )}
          </h3>
          {editMode && initialState.userType === 'scholar' ? (
            <textarea
              className="text-md md:text-lg lg:text-xl text-gray-800 mt-2 leading-relaxed border border-gray-300 rounded p-2 w-full"
              value={researchArea}
              onChange={(e) => setResearchArea(e.target.value)}
            />
          ) : (
            <p className="text-md md:text-lg lg:text-xl text-gray-800 mt-2 leading-relaxed">
              {researchArea || "No research area specified. Click edit to add your research interests."}
            </p>
          )}
          {editMode && (
            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded mt-2">Save</button>
          )}
        </div>)}
      </div>
      {userProfile.data.user_type === 'scholar' && (userProfile.data.status !== 'Newbie' && userProfile.data.status !== 'Registered' && userProfile.data.status !== 'Synopsis') && (<div className="px-6 py-4">
        {(initialState.userType === 'admin' || initialState.userType === 'co-admin') && (
          <UploadForm
            formName="user"
            userId={userId}
            fieldName="thesis_url"
            buttonId="thesis_upload"
          />
        )}
      </div>)}

      {userProfile.data.user_type === 'scholar' && (<div>
        {[
          "Thesis Submitted",
          "Indian Examiner Assigned",
          "Foreign Examiner Assigned",
          "Comments Received By Indian Examiner",
          "Comments Received By Foreign Examiner",
          "Defence",
          "Defence Closed",
        ].includes(userProfile.data.status) && (
          <div className="px-6 py-4">
            <h3 className="text-2xl md:text-2xl lg:text-3xl font-semibold text-gray-700">
              Examiners Details
            </h3>
            {/* Indian Examiner Dropdown */}
            {isIndianExaminer === false && (<div className="mt-4 bg-white p-4 shadow-md rounded-lg">
              <h4 className="text-xl font-semibold text-blue-700">
                Indian Examiner
              </h4>
              <select
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                value={selectedIndianExaminer}
                onChange={(e) => setSelectedIndianExaminer(e.target.value)}
              >
                <option value="">Select Indian Examiner</option>
                {indianExaminerList.map((examiner) => (
                  <option key={examiner.id} value={examiner.id}>
                    {examiner.name}
                  </option>
                ))}
              </select>
              <button
                onClick={assignIndianExaminer}
                className="mt-2 p-2 bg-blue-600 text-white rounded-md"
              >
                Assign Indian Examiner
              </button>
            </div>)}
            {/* Indian Examiner Details */}
            {isIndianExaminer && (<div className="mt-4 bg-white p-4 shadow-md rounded-lg">
              <h4 className="text-xl font-semibold text-blue-700">
                Indian Examiner Details
              </h4>
              <p>Name: {studentIndianExaminer?.name}</p>
              <p>Designation: {studentIndianExaminer?.designation}</p>
              <p>Institute: {studentIndianExaminer?.institute}</p>
              <p>Email: {studentIndianExaminer?.email}</p>
              <textarea
                className="mt-2 p-2 w-full h-24 border border-gray-300 rounded-md"
                placeholder="Enter comments for the Indian Examiner"
                value={IndianExaminerComments}
                disabled={commentsFetched.indian}
                onChange={(e) => setIndianExaminerComments(e.target.value)}
              />
              {!commentsFetched.indian && (
                <AiOutlineSend
                  className="text-2xl text-green-500 cursor-pointer"
                  onClick={submitIndianExaminerComments}
                  title="Submit Indian Examiner Comments"
                />
              )}
            </div>)}

            {/* Foreign Examiner Dropdown */}
            {isForeignExaminer === false && (<div className="mt-4 bg-white p-4 shadow-md rounded-lg">
              <h4 className="text-xl font-semibold text-blue-700">
                Foreign Examiner
              </h4>
              <select
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                value={selectedForeignExaminer}
                onChange={(e) => setSelectedForeignExaminer(e.target.value)}
              >
                <option value="">Select Foreign Examiner</option>
                {foreignExaminerList.map((examiner) => (
                  <option key={examiner.id} value={examiner.id}>
                    {examiner.name}
                  </option>
                ))}
              </select>
              <button
                onClick={assignForeignExaminer}
                className="mt-2 p-2 bg-blue-600 text-white rounded-md"
              >
                Assign Foreign Examiner
              </button>
            </div>)}
            {/* Foreign Examiner Details */}
            {isForeignExaminer && (<div className="mt-4 bg-white p-4 shadow-md rounded-lg">
              <h4 className="text-xl font-semibold text-blue-700">
                Foreign Examiner Details
              </h4>
              <p>Name: {studentForeignExaminer?.name}</p>
              <p>Designation: {studentForeignExaminer?.designation}</p>
              <p>Institute: {studentForeignExaminer?.institute}</p>
              <p>Email: {studentForeignExaminer?.email}</p>
              <textarea
                className="mt-2 p-2 w-full h-24 border border-gray-300 rounded-md"
                placeholder="Enter comments for the Foreign Examiner"
                value={ForeignExaminerComments}
                disabled={commentsFetched.foreign}
                onChange={(e) => setForeignExaminerComments(e.target.value)}
              />
              {!commentsFetched.foreign && (
                <AiOutlineSend
                  className="text-2xl text-green-500 cursor-pointer"
                  onClick={submitForeignExaminerComments}
                  title="Submit Foreign Examiner Comments"
                />
              )}
            </div>)}
          </div>
        )}
      </div>)}

      {userProfile.data.user_type === 'scholar' && (<div className="px-4 py-6">
        <h3 className="text-2xl font-semibold text-center mb-4">
          Scholar Forms
        </h3>
        <div className="grid grid-cols-4 gap-6">
          {[
            "form1a",
            "form1b",
            "form2",
            "form3a",
            "form3b",
            "form3c",
            "form4a",
            "form4b",
            "form4c",
            "form4d",
            "form4e",
            "form5",
            "form6",
          ].map((form) => (
            <div
              key={form}
              className="bg-white p-4 shadow-md rounded-lg h-24 flex items-center justify-between cursor-pointer hover:bg-blue-50 transition duration-300"
              onClick={() => {
                setSelectedForm(form);
                setIsModalOpen(true);
              }}
            >
              <div className="flex items-center space-x-3">
                <AiOutlineFileText className="text-blue-500 text-5xl" />{" "}
                {/* Icon representing a document or form */}
                <span className=" text-gray-800 pl-2 text-2xl">
                  {`${form.toUpperCase().replace(/(\d+)/, " $1")}`}{" "}
                  {/* Cleaner name formatting */}
                </span>
              </div>
              {isFormSubmitted(userProfile.data[form + "_submitted"]) && (
                <AiFillCheckCircle className="text-green-500 text-3xl" />
              )}{" "}
              {/* Changed icon for visual feedback */}
            </div>
          ))}
        </div>
      </div>)}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              <AiOutlineClose className="text-2xl" />
            </button>
            {renderFormComponent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
