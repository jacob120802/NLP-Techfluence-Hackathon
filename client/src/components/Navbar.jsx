import React, { useState, useEffect } from 'react';
import { FiMenu } from "react-icons/fi";
import logo from '../assets/logo2.png'
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token)
        if (token) {
            setIsLoggedIn(true);
        }
    }, [])

    const handleClick = () =>{
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/")
        
    }

    return (
        <header className="border-b border-gray-300 py-4">
            <div className="flex items-center justify-between xl:max-w-7xl xl:mx-auto max-w-full px-[8%] flex-wrap w-full">
                <span className='flex items-center'><img src={logo} width={100} height={45} alt="logo" />
                <h1 className='text-3xl font-bold sm:text-4xl'>MediBOT</h1></span>
                <FiMenu className="lg:hidden block h-6 w-6 cursor-pointer" onClick={() => setOpen(!open)} />
                <nav className={`lg:flex lg:items-center lg:w-auto w-full ${open ? "block" : "hidden"} mt-5 lg:mt-0`}>
                    <ul className="text-base text-gray-600 lg:flex lg:justify-center text-center">
                        <li>
                            <Link className="lg:px-5 py-2 block hover:text-blue-700 font-semibold" to="/">Home</Link>
                        </li>
                        <li>
                            <Link className="lg:px-5 py-2 block hover:text-blue-700 font-semibold" to="/about">About</Link>
                        </li>
                        <li>
                            <Link className="lg:px-5 py-2 block hover:text-blue-700 font-semibold" to="/contact">Contact</Link>
                        </li>
                        {isLoggedIn ? 
                            <>
                                <li>
                                    <Link className="lg:px-5 py-2 block hover:text-indigo-700 font-semibold" to="/dashboard">Dashboard</Link>
                                </li>
                                <li>
                                    <Link className="lg:px-3 py-2 block bg-blue-700 text-white rounded-xl font-semibold" onClick={handleClick}>Logout</Link>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <Link className="lg:px-5 py-2 block hover:text-indigo-700 font-semibold" to="/signin">Sign In</Link>
                                </li>
                                <li>
                                    <Link className="lg:px-3 py-2 block bg-blue-700 text-white rounded-xl font-semibold" to="signup">Register</Link>
                                </li>
                            </>
                        }
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;