import React, { useEffect, useState } from 'react'
import axios from 'axios';

const sampleResponses = [
  {
    id: 1,
    prompt: "I have only been on Tekturna for 9 days. The effect was immediate. I am also on a calcium channel blocker (Tiazac) and hydrochlorothiazide. I was put on Tekturna because of palpitations experienced with Diovan (ugly drug in my opinion, same company produces both however). The palpitations were pretty bad on Diovan, 24 hour monitor by EKG etc. After a few days of substituting Tekturna for Diovan, there are no more palpitations",
  },
  {
    id: 2,
    prompt: "This is the third med I&#039;ve tried for anxiety and mild depression. Been on it for a week and I hate it so much. I am so dizzy, I have major diarrhea and feel worse than I started. Contacting my doc in the am and changing asap",
  },
  {
    id: 3,
    prompt: "I just got diagnosed with type 2. My doctor prescribed Invokana and metformin from the beginning. My sugars went down to normal by the second week. I am losing so much weight. No side effects yet. Miracle medicine for me",
  }
]

function DetectDisease(props) {
  useEffect(() => {
    document.title = props.title
  }, [])

  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState("")

  const handleChange = (e) => {
    setPrompt(e.target.value)
  }

  const handleClick = async (e) => {
    e.preventDefault()
    console.log(prompt)
    const url = "http://localhost:8000/api/chat/chatbot"
    try {
      const response = await axios.post(url, { text: prompt })
      setResult(response.data.data.replace("/r", ""))
    }
    catch (err) {
      console.log(err)
    }
  }


  return (
    <div className="justify-center flex flex-col w-[50vw] mx-auto mt-10">
      <textarea type="text" className="text-sm rounded-md bg-gray-100 outline-2" onChange={handleChange} />
      <div>
        {
          sampleResponses.map((response) => {
            return (
              <div key={response.id} className="mt-2 bg-gray-500 text-white flex flex-wrap w-[50vw]" onClick={() => setPrompt(response.prompt)}>
                <p className="text-sm px-2 py-3 items-center justify-center">{response.prompt}</p>
              </div>
            )
          })
        }
      </div>
      <button className='px-2 py-3 bg-blue-600 mt-4 text-white' onClick={handleClick}>Submit</button>
      {result &&
        <div className='mt-4'>
          Disease : {result}
        </div>
      }
    </div>
  )
}

export default DetectDisease