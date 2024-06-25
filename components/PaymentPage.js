"use client"
import React from 'react'
import Script from 'next/script'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Razorpay from 'razorpay'
import dotenv from 'dotenv';
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { notFound } from "next/navigation"

export const metadata = ({ params }) => {
    title: `Payment Page for the user ${params.username}`;
    description: 'Payment page';
}

require('dotenv').config();

const PaymentPage = ({ username }) => {
    // const { data: session} = useSession();
    const [paymentform, setpaymentform] = useState({ name: "", message: "", amount: "" });
    const [currentUser, setcurrentUser] = useState({});
    const [payments, setPayments] = useState([]);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true") {
            toast('Payment has been made', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                // transition: Bounce,
            });
        }
        router.push(`/${username}`);
    }, [])


    const handleChange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchuser(username);
        setcurrentUser(u);
        let dbpayments = await fetchpayments(username);
        setPayments(dbpayments);
        // console.log(u, dbpayments);
    }

    const pay = async (amount) => {
        // Get the order Id
        let a = await initiate(amount, username, paymentform);
        // console.log(a);
        let order_Id = a.id;
        // console.log(order_Id);
        let options = {
            "key": currentUser.razorpay_id,
            "amount": amount,
            "currency": "INR",
            "name": "Patreon_clone",
            "description": "Test transaction",
            "image": "https://example.com/your_logo",
            "order_id": order_Id,
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            // "prefill": {
            //     "name": "Jarvis",
            //     "email": "example@gmail.com",
            //     "contact": "9999999999"
            // },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }

        // console.log(options);
        // console.log(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);

        // console.log(options);
        var rzp1 = new window.Razorpay(options);

        rzp1.open();
        // e.preventDefault();

    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            // transition="Bounce"
            />
            <ToastContainer />
            {/* <button id="rzp-button1">Pay</button> */}
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='cover w-full relative'>
                <img className='object-cover w-full h-[350]' src={currentUser.coverpic} alt="cover image" />
                <div className='profile-pic absolute flex justify-center w-full bottom-0 transform: translate-y-1/2 z-1'>
                    <img className='rounded-xl' width={150} height={150} src={currentUser.profilepic} alt="profile image" />
                </div>
            </div>

            <div className="info flex flex-col justify-center items-center my-20 gap-2">
                <div className='font-bold text-lg'>
                    @{username}
                </div>
                <div className='text-slate-400'>
                    Lets help {username} get a coffee :o !
                </div>
                <div className='text-slate-400'>
                    {payments.filter(p => p.status === 'success').length} Payments, Rs {payments.reduce((acc, p) => acc + p.amount, 0)} has been rasied so far from top 10 payments.
                </div>

                <div className="payment flex flex-col md:flex-row gap-3 w-full justify-around md:w-[80%] mt-8 max-h-[70vh]">
                    <div className="supporters w-full mx-3 md:mx-0 md:w-1/2 bg-slate-900 rounded-xl text-white px-7 py-3 overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-700 scrollbar-track-gray-500">
                        {/* Show list of all the supporters as a leaderboard */}
                        <h2 className='text-lg font-bold my-3'>Top 10 Supporters</h2>
                        <ul className='mx-5'>
                            {payments.length == 0 && <li className='my-3'>No payments yet</li>}
                            {payments.map((p, i) => {
                                return <li className='my-3 flex gap-2 items-center'>
                                    <img width={30} src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp&w=256" alt="user avatar" />
                                    <span>
                                        "{p.name}" donated <span className="font-bold">Rs {p.amount}</span> with a message "{p.message}".
                                    </span>

                                </li>
                            })}

                        </ul>
                    </div>
                    <div className="makePayment mx-3 md:mx-0 w-full md:w-1/2 bg-slate-900 rounded-xl text-white px-7 py-3">
                        {/* Give user access to make payments to support the creaters */}
                        <h2 className="text-lg font-bold my-3">Make a Payment</h2>
                        <div className="flex gap-2 flex-col">
                            {/* input for name and message */}
                            <input onChange={(e) => handleChange(e)} value={paymentform.name} name='name' type="text" className="w-full p-3 rounded-lg bg-slate-800" placeholder='Enter Your Name' />
                            <input onChange={(e) => handleChange(e)} value={paymentform.message} name='message' type="text" className="w-full p-3 rounded-lg bg-slate-800" placeholder='Enter Your Message' />
                            <input onChange={(e) => handleChange(e)} value={paymentform.amount} name='amount' type="text" className="w-full p-3 rounded-lg bg-slate-800" placeholder='Enter Amount' />
                            <button onClick={() => pay(paymentform.amount)} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-600 disabled:from-slate-900" disabled={paymentform.name?.length < 1 || paymentform.message?.length < 3 || paymentform.amount < 1} >Pay</button>

                        </div>
                        {/* Or choose form these amounts */}
                        <div className="flex flex-col md:flex-row gap-2 mt-3">
                            <button className="bg-slate-800 p-3 rounded-lg" onClick={() => pay(10)} >Pay Rs 10</button>
                            <button className="bg-slate-800 p-3 rounded-lg" onClick={() => pay(20)} >Pay Rs 20</button>
                            <button className="bg-slate-800 p-3 rounded-lg" onClick={() => pay(30)} >Pay Rs 30</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default PaymentPage
