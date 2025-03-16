// import React from 'react'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import { useDispatch } from 'react-redux'
import { 
    // Navigate, 
    NavLink, 
    // redirect, 
    useNavigate } from 'react-router-dom'
import {
  login,
  register,
} from '../../../redux/features/authentication/authSlice'

export default function Authentication(prop) {
  const { isLoginComponent } = prop

  const dispatch = useDispatch()

  const navigate = useNavigate()

  // TODO: try to use react router form <Form> with its action function instead
  // TODO: it would be better to separate the handling of the submission of the login and registering events
  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    if (isLoginComponent === true) {
      const loginData = {
        email: formData.get('email'),
        password: formData.get('password'),
      }
    //   console.log(loginData)

      await dispatch(
        login({
          email: loginData.email,
          password: loginData.password,
        })
      )
      // adding await is very important here, because it ensures the login happens before redirecting in the code below

      //   redirect('/')
      // redirect() only works inside action or loader function
      //   Navigate('/')

      navigate('/')

      return
    }

    const registeringData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
    }
    // console.log(registeringData)

    await dispatch(
      register({
        firstName: registeringData.firstName,
        lastName: registeringData.lastName,
        email: registeringData.email,
        password: registeringData.password,
      })
    )

    // adding await is very important here, because it ensures the login happens before redirecting in the code below

    //   redirect('/')
    // redirect() only works inside action or loader function
    //   Navigate('/')

    navigate('/')
  }
  // TODO: add the disabled, isSubmitting, errorResponse (or isError) and replace state of the <form>

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          /> */}
          <LocalMallIcon
            sx={{ color: 'blue', fontSize: 45, mx: 'auto', display: 'block' }}
          />
          {isLoginComponent === true ? (
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          ) : (
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign up
            </h2>
          )}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit}
            /*action="#" method="POST"*/ className="space-y-6"
          >
            {!isLoginComponent && (
              <div>
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    First Name
                  </label>
                  <div className="mt-2 border-2">
                    <input
                      id="first-name"
                      name="firstName"
                      type="text"
                      required
                      autoComplete="given-name"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Last Name
                  </label>
                  <div className="mt-2 border-2">
                    <input
                      id="last-name"
                      name="lastName"
                      type="text"
                      required
                      autoComplete="family-name"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2 border-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>

                {isLoginComponent === true ? (
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className="mt-2 border-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            {isLoginComponent === true ? (
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            ) : (
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
            )}
          </form>

          {isLoginComponent === true ? (
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Don't have an account?{' '}
              {/* <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              > */}
              <NavLink
                to="/sign-up"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                sign up here
              </NavLink>
              {/* </a> */}
            </p>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  )
}
