import React from 'react'
import { AiFillMedicineBox, AiFillWechat, AiFillFileMarkdown } from "react-icons/ai";
import homelogo from '../assets/home2.png'
import { Link } from "react-router-dom";
function Home(props) {
    useEffect(() => {
        document.title = props.title
    }, [])
    return (
        <div className='w-full h-screen flex flex-col justify-between'>
            <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
                <div className='flex flex-col justify-center md:items-start w-full px-2 py-5'>
                    <p className='text-2xl'>User-Friendly & Personalized</p>
                    <h1 className='py-3 text-5xl md:text-7xl font-bold'>Health BOT</h1>
                    <p className='text-2xl'>This is our NLP based Online Medical Consultation System.</p>
                    <button className='py-3 px-6 sm:w-[60%] my-4'><Link className="lg:px-3 py-2 block bg-blue-700 text-white rounded-xl font-semibold" to="signup">Get Started</Link></button>
                </div>
                <div>
                    <img src={homelogo} alt="/" />
                </div>
            </div>
        </div>
    )
}

export default Home