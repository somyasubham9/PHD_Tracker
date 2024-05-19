import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  firstName: "",
  lastName: "",
  userEmail: "",
  userId: "",
  status:"",
  supervisor:"",
  form1a_submitted: "",
  form1b_submitted: "",
  form2_submitted: "",
  form3a_submitted: "",
  form3b_submitted: "",
  form3c_submitted: "",
  form4a_submitted: "",
  form4c_submitted: "",
  form4b_submitted: "",
  form4d_submitted: "",
  form4e_submitted: "",
  form5_submitted: "",
  form6_submitted: "",
  date_joined: "",
  created_date:"",
  updated_date:"",
};

const user = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    updateIsLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload;
    },
    updateUserEmail: (state, { payload }) => {
      state.userEmail = payload;
    },
    updateFirstName: (state, { payload }) => {
      state.firstName = payload;
    },
    updateLastName: (state, { payload }) => {
      state.lastName = payload;
    },
    updateUserId: (state, { payload }) => {
      state.userId = payload;
    },
    updateStatus: (state, { payload }) => {
      state.status = payload;
    },
    updateSupervisor: (state, { payload }) => {
      state.supervisor = payload;
    },
    updateform1a_submitted: (state, { payload }) => {
      state.form1a_submitted = payload;
    },
    updateform1b_submitted: (state, { payload }) => {
      state.form1b_submitted = payload;
    },
    updateform1c_submitted: (state, { payload }) => {
      state.form1c_submitted = payload;
    },
    updateform2_submitted: (state, { payload }) => {
      state.form2_submitted = payload;
    },
    updateform3a_submitted: (state, { payload }) => {
      state.form3a_submitted = payload;
    },
    updateform3b_submitted: (state, { payload }) => {
      state.form3b_submitted = payload;
    },
    updateform3c_submitted: (state, { payload }) => {
      state.form3c_submitted = payload;
    },
    updateform4a_submitted: (state, { payload }) => {
      state.form4a_submitted = payload;
    },
    updateform4b_submitted: (state, { payload }) => {
      state.form4b_submitted = payload;
    },
    updateform4c_submitted: (state, { payload }) => {
      state.form4c_submitted = payload;
    },
    updateform4d_submitted: (state, { payload }) => {
      state.form4d_submitted = payload;
    },
    updateform4e_submitted: (state, { payload }) => {
      state.form4e_submitted = payload;
    },
    updateform5_submitted: (state, { payload }) => {
      state.form5_submitted = payload;
    },
    updateform6_submitted: (state, { payload }) => {
      state.form6_submitted = payload;
    },
  },
});

export const {
  updateIsLoggedIn,
  updateFirstName,
  updateLasttName,
  updateUserEmail,
  updateUserId,
  updateStatus,
  updateform1a_submitted,
  updateform1b_submitted,
  updateform1c_submitted,
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
} = user.actions;
export default user.reducer;
