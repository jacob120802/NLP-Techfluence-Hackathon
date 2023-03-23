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
        // console.log(data)
        setNews(data)
        // console.log(news)

    }

    return (
        <>
            <div>News</div>
            {/* {
                news.map((element) => {
                    return (
                        <div key={element.id}>
                            <h1>{element.title}</h1>
                            <p>{element.description}</p>
                        </div>
                    )
                })
            } */}
        </>
    )
}

export default News