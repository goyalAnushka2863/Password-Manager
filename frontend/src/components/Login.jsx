import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../utils/constant';
const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();

  console.log(BASE_URL)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        toast('Login successful!', { theme: 'dark' });
        navigate('/')
      } else {
        toast.error(data.error || 'Login failed');
      }
    } catch {
      toast.error('Network error');
    }
  };

  return (
    <>
      <ToastContainer theme="dark" />
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
        <div className="p-2 md:px-5 md:py-8 md:mycontainer overflow-auto mb-9 h-full max-w-md mx-auto">
          <div className="logo font-bold text-4xl text-center mb-2">
            <span className='text-[#a59afffa]'>&lt;</span>
            Pass
            <span className='text-[#a59afffa]'>OP/&gt;</span>
          </div>
          <p className='text-[#9e92f8fa] text-lg text-center mb-2'>Login to your account</p>
          <p className='text-center text-[#a59afffa] text-sm mb-4'>
            New here? <Link to="/signup" className='underline hover:text-[#6a42d8]'>Create an account</Link>
          </p>
          <form className="flex flex-col p-4 gap-8" onSubmit={handleLogin}>
            <input
              onChange={handleChange}
              name='email'
              value={form.email}
              placeholder='Enter Email'
              type="email"
              className='rounded-full text-black border-[3px] border-[#4e2cd7fa] py-1 px-4'
              required
            />
            <div className="relative flex items-center">
              <input
                onChange={handleChange}
                name='password'
                value={form.password}
                placeholder='Enter Password'
                type={isShow ? 'text' : 'password'}
                className='w-full rounded-full text-black border-[3px] border-[#4e2cd7fa] py-1 px-4'
                required
              />
              <span className='absolute right-5 cursor-pointer' onClick={() => setIsShow(!isShow)}>
                {isShow
                  ? <svg width="20" height="20" fill="black"><path d="M1 10c2.5-5 15.5-5 18 0-2.5 5-15.5 5-18 0z" /><circle cx="10" cy="10" r="3" fill="#fff" /></svg>
                  : <svg width="20" height="20" fill="black"><path d="M1 10c2.5-5 15.5-5 18 0-2.5 5-15.5 5-18 0z" /><line x1="4" y1="16" x2="16" y2="4" stroke="#fff" strokeWidth="2" /></svg>
                }
              </span>
            </div>
            <button
              type="submit"
              className='flex justify-center items-center bg-[#3A1D87] hover:bg-[#6a42d8] rounded-full py-1 px-4 w-fit gap-3 border-gray-400 border-[1px] mx-auto'
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
