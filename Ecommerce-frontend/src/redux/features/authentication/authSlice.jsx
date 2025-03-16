import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// sign up
// login/sign in
// logout
// get user profile

const url = 'http://localhost:8088/api'
// TODO: it is better to add the above url in the development .env.development file

// Load token from localStorage if it exists:
const token = localStorage.getItem('token')

const initialState = {
  token: token || null,
  isAuthenticated: !!token,
  // "!!" is double negation, the first negation converts token variable into a boolean. if token is empty string, !token will be true, and !!token will be false
  // the above state variable is dependent on the other stat variable "token"
}

// login:
export const login = createAsyncThunk(
  'auth/authenticate',
  async (params = {}, thunkAPI) => {
    try {
      const { email = '', password = '' } = params

      // TODO: for better readability, the below is better to be written as `${}` rather than ""
      const response = await axios.post(
        url + '/auth/authenticate',
        { email: email, password: password },
        {
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${authToken}`,
          },
        }
      )

      // finished-TODO: replace adding the jwt token here by adding/attaching it through a global interceptor
      //   related to the above note: jwt is not added here
      // finished-TODO: replace the above by using axios instance (that is axios.create()) (and if wanted, add the interceptor) and then apply the get, post, put, delete methods
      //   related to the above note: jwt is not added here

      return response.data
    } catch (err) {
      console.error('error fetching products', err.toJSON?.() || err)
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)

// register:
export const register = createAsyncThunk(
  'auth/register',
  async (params = {}, thunkAPI) => {
    try {
      const {
        firstName = "",
        lastName = "",
        email = "",
        password = "",
      } = params

      // TODO: for better readability, the below is better to be written as `${}` rather than ""
      const response = await axios.post(
        url + '/auth/register',
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${authToken}`,
          },
        }
      )

      // finished-TODO: replace adding the jwt token here by adding/attaching it through a global interceptor
      //   related to the above note: jwt is not added here
      // finished-TODO: replace the above by using axios instance (that is axios.create()) (and if wanted, add the interceptor) and then apply the get, post, put, delete methods
      //   related to the above note: jwt is not added here

      return response.data
    } catch (err) {
      console.error('error registering', err.toJSON?.() || err)
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)

// check if the token is expired:
export const isUserAuthenticated = createAsyncThunk(
  'auth/isUserAuthenticated',
  async (/*params = {},*/ thunkAPI) => {
    // check if there is token:
    if (!token) {
      return false
    }

    // check if the token is expired:
    try {
      // TODO: for better readability, the below is better to be written as `${}` rather than ""
      const response = await axios(url + '/auth/isTokenExpired/' + token, {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${authToken}`,
        },
      })

      // finished-TODO: replace adding the jwt token here by adding/attaching it through a global interceptor
      //   related to the above note: jwt is not added here
      // finished-TODO: replace the above by using axios instance (that is axios.create()) (and if wanted, add the interceptor) and then apply the get, post, put, delete methods
      //   related to the above note: jwt is not added here

      return response.data
    } catch (err) {
      console.error('error fetching products', err.toJSON?.() || err)
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state /*, action*/) => {
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('token') // remove token

      // console.log("logout token: ",localStorage.getItem("token"))
    },
  },
  extraReducers: (builder) => {
    builder
      // login:
      .addCase(login.pending, (/*state*/) => {})
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.accessToken
        localStorage.setItem('token', action.payload.accessToken) // store token
      })
      .addCase(login.rejected, (/*state, action*/) => {})
      // register:
      .addCase(register.pending, (/*state*/) => {})
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.accessToken
        localStorage.setItem('token', action.payload.accessToken) // store token
      })
      .addCase(register.rejected, (/*state, action*/) => {})
      // isTokenExpired:
      .addCase(isUserAuthenticated.pending, (/*state*/) => {})
      .addCase(isUserAuthenticated.fulfilled, (state, action) => {
        if (action.payload === true) {
          state.token = null
          state.isAuthenticated = false
          localStorage.removeItem('token') // remove token
        }
      })
      .addCase(isUserAuthenticated.rejected, (/*state, action*/) => {})
  },
})

export const {
  logout,
} = authSlice.actions

export default authSlice.reducer
