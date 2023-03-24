import React,{useEffect} from 'react'
import ServiceCard from './ServiceCard'
const services = [
    {
        title: 'Health Updates',
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2xBYZ9cRcGJTGPfmpYnpu5L15ZWMH9APlnw&usqp=CAU",
        "description": "One stop solution for all important health related news update. News reports on emerging research, new treatments, diet, exercise, and trending topics in health and wellness. ",
        "src": "/news"
    },
    {
        title: 'Disease Diagnosis',
        icon: "https://wisdomml.in/wp-content/uploads/2022/07/heart-attack-gfa6d39647_640.png",
        "description": "Machine learning-based disease prediction model that can accurately predict the likelihood of developing certain diseases based on a person's medical history and lifestyle factors. The model could help doctors provide personalized treatment plans and improve patient outcomes.",
        "src": "/detect"
    },
    {
        title: 'ChatBot',
        icon: "data:image/png;base64,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",
        "description": "Medical assistance chatbot is being developed to provide patients with 24/7 assistence to patients for any doubts. The chatbot uses advanced AI technology to answer medical questions and provide personalized healthcare advice. This healthcare chatbot system will help hospitals to provide healthcare support online 24 x 7, it answers deep as well as general questions.",
        "src": "/chat"
    },{
        title: 'BMI Calculator',
        icon: "https://kompanionapp.com/wp-content/uploads/2022/05/BMI-1-1-scaled.jpg",
        "description": "online BMI calculator has been developed to help people track their weight and monitor their health. The calculator uses the latest medical guidelines to calculate BMI, and provides personalized recommendations for maintaining a healthy weight.",
        "src": "/bmi"
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