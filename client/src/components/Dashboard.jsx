import React,{useEffect} from 'react'
import ServiceCard from './ServiceCard'
const services = [
    {
        title: 'Health News',
        icon: "https://images.unsplash.com/photo-1501091975279-8a337f4a2b3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make",
        "src": "/news"
    },
    {
        title: 'Disease Diagnosis',
        icon: "https://images.unsplash.com/photo-1501091975279-8a337f4a2b3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make",
        "src": "/detect"
    },
    {
        title: 'Hello',
        icon: "https://images.unsplash.com/photo-1501091975279-8a337f4a2b3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make",
        "src": "/chat"
    }
]

function Dashboard(props) {
    useEffect(() => {
        document.title = props.title
    }, [])
    return (
        <div className=''>
            <h2 className="text-center text-3xl font-bold mt-10">Dashboard</h2>
            <div className="my-5 md:mt-20 flex flex-wrap gap-x-10 gap-y-4 justify-center">
                {
                    services.map((service, index) => {
                        return (
                            <ServiceCard key={index} index={index} {...service} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Dashboard