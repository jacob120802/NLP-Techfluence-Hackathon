import React, { useState, useEffect } from 'react'

function News(props) {
    useEffect(() => {
        document.title = props.title
        getNews()
    }, [])

    const [news, setNews] = useState([])
    const API_KEY = "4b032228fe12449fa4ed4c0c510a33d3"

    const getNews = async () => {
        const response = await fetch(`https://newsapi.org/v2/everything?q==health&apiKey=${API_KEY}`)
        let data = await response.json()
        data = data['articles']
        console.log(data)
        setNews(data)
        console.log(news)

    }

    return (
        <>
            <div className="py-3 text-5xl md:text-7xl font-bold text-center my-6">News</div>
            <div className=" w-screen h-screen flex flex-wrap gap-6 justify-center">
            {
                news.map((element) => {
                    return (
                        <div class="max-w-sm h-auto bg-zinc-100 rounded-xl shadow-2xl">
                            <img src={element.urlToImage} className="w-full rounded-t-xl" alt="image"/>
                            <h2 className="font-bold text-lg my-2 mx-4">{element.title}</h2>
                            <p className="font-medium text-sm my-4 mx-4">{element.description}</p>
                            <button className="bg-indigo-700 text-white font-bold p-4 flex justify-center mx-auto rounded-md my-2 hover:bg-indigo-800 hover:scale-105 duration-300"><a href={element.url} target="_blank">Read More</a></button>

                            

                        </div>
                    )
                })
            }
            </div>
        </>
    )
}

export default News