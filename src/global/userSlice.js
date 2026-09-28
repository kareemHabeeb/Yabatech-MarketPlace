import { createSlice } from "@reduxjs/toolkit";

/*
========================================
USER INITIAL STATE
========================================
*/

const userInitialState = {
  user: null,
  token: null,
};

/*
========================================
USER SLICE
========================================
*/

const userSlice = createSlice({
  name: "user",

  initialState: userInitialState,

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setToken: (state, action) => {
      state.token = action.payload;
    },

    clearUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

/*
========================================
STAFF INITIAL STATE
========================================
*/

const staffInitialState = {
  staffUser: null,
  token: null,
};

/*
========================================
STAFF SLICE
========================================
*/

const staffSlice = createSlice({
  name: "staff",

  initialState: staffInitialState,

  reducers: {
    setStaffUser: (state, action) => {
      state.staffUser = action.payload;
    },

    setStaffToken: (state, action) => {
      state.token = action.payload;
    },

    clearStaff: (state) => {
      state.staffUser = null;
      state.token = null;
    },
  },
});

/*
========================================
USER ACTIONS
========================================
*/

export const { setUser, setToken, clearUser } = userSlice.actions;

/*
========================================
STAFF ACTIONS
========================================
*/

export const { setStaffUser, setStaffToken, clearStaff } = staffSlice.actions;

/*
========================================
REDUCERS
========================================
*/

export const userReducer = userSlice.reducer;

export const staffReducer = staffSlice.reducer;
