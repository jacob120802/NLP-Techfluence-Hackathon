import React from 'react'

function ServiceCard({title,icon,description,src}) {
    return (
        <div className="xs:w-[300px] sm:w-[50vw] md:w-[30vw]" onClick={() => window.open(src)}>
            <div className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card">
            <div className="bg-tertiary rounded-[20px] min-h-[280px] flex justify-evenly items-center flex-col">
                <img height="50" src={icon} alt={title} className="object-contain w-full"/>
                <h3 className="text-white text-[20px] font-bold text-center">{title}</h3>
                <p className="text-white text-sm p-4">{description.substring(0,400)}</p>
            </div>
            </div>
        </div>
    )
}

export default ServiceCard