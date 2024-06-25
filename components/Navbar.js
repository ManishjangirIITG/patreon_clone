"use client"
import React, { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'

const Navbar = () => {
    const { data: session } = useSession()
    const [showdropdown, setshowdropdown] = useState(false)
    // if (session) {
    //     return <>
    //         Signed in as {session.user.email} <br />
    //         <button onClick={() => signOut()}>Sign out</button>
    //     </>
    // }
    return (
        <nav className='bg-gray-900 text-white flex justify-center md:justify-between px-4 py-2 md:h-16 items-center flex-col md:flex-row'>

            <Link className="logo font-bold text-xl flex justify-center items-center gap-2 my-2" href={"/"}>
                <img width={22} src="/coffee.gif" alt="" />
                <span className='text-2xl'> Buy me a Coffee</span>
            </Link>

            {/* <ul className="flex gap-6">
                <li>Home</li>
                <li>About</li>
                <li>Projects</li>
                <li>Sign Up</li>
                <li>Login</li>
            </ul> */}

            <div className='relative flex flex-col md:flex-row gap-4'>
                {session && <> <button onClick={() => setshowdropdown(!showdropdown)} onBlur={() => {
                    setTimeout(() => {
                        setshowdropdown(false)
                    }, 300);
                }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-1" type="button">Welcome {session.user.name}<svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>


                    <div id="dropdown" className={`z-10 ${showdropdown ? "" : "hidden"} bg-white divide-y absolute left-[69px] divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                                <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                            </li>
                            <li>
                                <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                            </li>
                            <li>
                                <Link href={'/about'} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">About Us</Link>
                            </li>
                            {/* <li>
                                <Link onClick={()=>{signOut()}} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                            </li> */}
                        </ul>
                    </div>
                </>
                }
                {/* {session && <Link href={"/dashboard"}>
                    <button type="button" className="text-white mx-4 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Dashboard</button>
                </Link>} */}
                {session &&
                    <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 my-1" onClick={() => { signOut() }}>Log Out</button>
                }
                {!session &&
                    <Link href={"/login"}>
                        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 my-1">Login</button>
                    </Link>
                }
            </div>

        </nav>
    )
}

export default Navbar
