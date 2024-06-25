"use client"
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { updateProfile } from '@/actions/useractions'
import { get } from 'mongoose'
import { fetchuser } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// export const metadata = {
//   title: 'Dashboard',
//   description: 'Dashboard page',
// }

const Dashboard = () => {
  const { data: session, update, status } = useSession();
  const [form, setform] = useState({})
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      getData();
    }
    if (!session) {
      router.push('/login');
    }
  }, [router, session, status])

  const getData = async () => {
    if (session && session.user) {
      let u = await fetchuser(session.user.name);
      setform(u);
    } else {
      console.log("session or user data is ot available.");
    }
  }

  const handleSubmit = async (e) => {
    // update();
    let a = await updateProfile(e, session.user.name)
    toast('Profile updated :o', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }



  return (
    <>
      <ToastContainer />
      <div className="flex justify-center my-4">
        <div className='flex flex-col gap-1 w-full md:w-[50%] px-4 md:px-0'>
          <h2 className='font-bold text-xl text-center'>Welcome to your Dashboard</h2>
          <form action={handleSubmit} >
            <div className="my-2">
              <label htmlFor="name" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Name</label>
              <input value={form.name ? form.name : ""} onChange={handleChange} type="text" name='name' id="name" className='block w-full p-2 text-gray-900 border-gray-700 rounded-lg bg-gray-300 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
            </div>
            <div className="my-2">
              <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email</label>
              <input value={form.email ? form.email : ""} onChange={handleChange} type="text" name='email' id="email" className='block w-full p-2 text-gray-900 border-gray-700 rounded-lg bg-gray-300 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
            </div>
            <div className="my-2">
              <label htmlFor="username" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Username</label>
              <input value={form.username ? form.username : ""} onChange={handleChange} type="text" name='username' id="username" className='block w-full p-2 text-gray-900 border-gray-700 rounded-lg bg-gray-300 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
            </div>
            <div className="my-2">
              <label htmlFor="profilepic" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Profile Pic</label>
              <input value={form.profilepic ? form.profilepic : ""} onChange={handleChange} type="text" name='profilepic' id="profilepic" className='block w-full p-2 text-gray-900 border-gray-700 rounded-lg bg-gray-300 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
            </div>
            <div className="my-2">
              <label htmlFor="coverpic" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Cover Pic</label>
              <input value={form.coverpic ? form.coverpic : ""} onChange={handleChange} type="text" name='coverpic' id="coverpic" className='block w-full p-2 text-gray-900 border-gray-700 rounded-lg bg-gray-300 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
            </div>
            <div className="my-2">
              <label htmlFor="razorpay_id" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Razorpay Id</label>
              <input value={form.razorpay_id ? form.razorpay_id : ""} onChange={handleChange} type="password" name='razorpay_id' id="razorpay_id" className='block w-full p-2 text-gray-900 border-gray-700 rounded-lg bg-gray-300 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
            </div>
            <div className="my-2">
              <label htmlFor="razorpay_secret" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Razorpay Secret</label>
              <input value={form.razorpay_secret ? form.razorpay_secret : ""} onChange={handleChange} type="password" name='razorpay_secret' id="razorpay_secret" className='block w-full p-2 text-gray-900 border-gray-700 rounded-lg bg-gray-300 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
            </div>
            <button className="text-white w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-4" >Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
