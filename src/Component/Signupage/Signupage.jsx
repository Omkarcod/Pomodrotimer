
import React, { useState } from 'react';
import Inputs from '../Inputs/Inputs';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';

const Signupage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    email: '',
    pass: '',
  });
  const [errormsg, setErrormsg] = useState('');
  const [submitBtnDisable, setSubmitBtnDisable] = useState(false);

  const handleSubmit = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrormsg('Please fill all fields');
      return;
    }
    setSubmitBtnDisable(true);
    setErrormsg('');

    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitBtnDisable(false);
        const user = res.user;
        await updateProfile(user, { displayName: values.name });
        navigate('/login');
      })
      .catch((err) => {
        setSubmitBtnDisable(false);
        setErrormsg(err.message);
        console.log(err.message, 'error');
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 flex justify-center items-center">
      <div className="w-full max-w-md bg-white shadow-md p-8 rounded-lg flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Signup</h1>
        <Inputs
          label="Name"
          placeholder="Enter Name address"
          onChange={(e) =>
            setValues((pre) => ({ ...pre, name: e.target.value }))
          }
        />
        <Inputs
          label="Email"
          placeholder="Enter email address"
          onChange={(e) =>
            setValues((pre) => ({ ...pre, email: e.target.value }))
          }
        />
        <Inputs
          label="Password"
          placeholder="Enter password"
          onChange={(e) =>
            setValues((pre) => ({ ...pre, pass: e.target.value }))
          }
        />

        <div className="flex flex-col gap-4">
          <b className="text-red-500 text-sm">{errormsg}</b>
          <button
            onClick={handleSubmit}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-md font-semibold"
            disabled={submitBtnDisable}
          >
            Signup
          </button>
          <p className="font-bold text-black">
            Already have an account?{' '}
            <span className="text-purple-500 text-base">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signupage;
