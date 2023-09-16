

import React, { useState, useEffect } from 'react';
import Inputs from '../Inputs/Inputs';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const Loginpage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    pass: '',
  });
  const [errormsg, setErrormsg] = useState('');
  const [submitBtnDisable, setSubmitBtnDisable] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false); // Track if the user has signed up

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setIsSignedUp(!!authUser.displayName); // Check if the user has a display name (signed up)
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSubmit = () => {
    if (!values.email || !values.pass) {
      setErrormsg('Please fill all fields');
      return;
    }
    setSubmitBtnDisable(true);
    setErrormsg('');

    if (!isSignedUp) {
      // If the user hasn't signed up yet, show an error message
      setErrormsg('You need to sign up first.');
      setSubmitBtnDisable(false);
      return;
    }

    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitBtnDisable(false);
        navigate('/');
      })
      .catch((err) => {
        setSubmitBtnDisable(false);
        setErrormsg(err.message);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 flex justify-center items-center">
      <div className="w-full max-w-md bg-white shadow-md p-8 rounded-lg flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Login</h1>
        <Inputs
          onChange={(e) =>
            setValues((pre) => ({ ...pre, email: e.target.value }))
          }
          label="Email"
          placeholder="Enter email address"
        />
        <Inputs
          onChange={(e) =>
            setValues((pre) => ({ ...pre, pass: e.target.value }))
          }
          label="Password"
          placeholder="Enter password"
        />

        <div className="flex flex-col gap-4">
          <b className="text-red-500 text-sm">{errormsg}</b>
          <button
            onClick={handleSubmit}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-md font-semibold"
            disabled={submitBtnDisable}
          >
            Login
          </button>
          <p className="font-bold text-black">
            Don't have an account?{' '}
            <span className="text-purple-500 text-base">
              <Link to="/signup">Signup</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;


