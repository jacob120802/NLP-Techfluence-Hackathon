// import React, { useEffect, useState } from 'react';

// function Chat(props) {
//     useEffect(() => {
//         document.title = props.title
//     }, [])

//     const [messages, setMessages] = useState([
//         {
//             msg: "Hi, how can I help you?",
//             sender: "bot"
//         }
//     ])

//     const [prompt, setPrompt] = useState("")
//     const handleChange = (e) => {
//         e.preventDefault()
//         setPrompt(e.target.value)
//     }

//     async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
//         // Format messages for chatGPT API
//         // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
//         // So we need to reformat

//         // let apiMessages = chatMessages.map((messageObject) => {
//         //     let role = "";
//         //     if (messageObject.sender === "ChatGPT") {
//         //         role = "assistant";
//         //     } else {
//         //         role = "user";
//         //     }
//         return { sender: "bot", msg: "Hi" }
//         // });
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         if (prompt !== "") {
//             const newMessage = {
//                 msg: prompt,
//                 sender: "user"
//             };

//             const newMessages = [...messages, newMessage];

//             setMessages(newMessages);
//             await processMessageToChatGPT(newMessages);
//             console.log(newMessages)
//         }

//         else {

//         }
//     };

//     return (
//         <div className="flex flex-col h-[90vh] w-[70vw] mx-auto mt-4">
//             <div className="bg-gray-800 py-2 px-4">
//                 <h1 className="text-white font-bold text-xl">MeddiBuddy</h1>
//             </div>
//             <div className="flex-1 overflow-y-auto p-4">
//                 {
//                     messages.map((message, index) => {
//                         return (
//                             <div className={`flex ${message.sender === 'user' ? 'justify-start' : 'justify-end'} mt-4`} key={index}>
//                                 <div className={`max-w-xs w-full ${message.sender === 'user' ? ' bg-indigo-500' : 'bg-white'} ${message.sender === 'user' ? ' text-white' : ''} shadow-md rounded-lg p-3`}>
//                                     <div className={`text-sm ${message.sender === 'user' ? '' : 'text-gray-600'} `}>{message.msg}</div>
//                                 </div>
//                             </div>
//                         )
//                     })
//                 }
//                 {
//                     prompt &&
//                     <div className='flex justify-end mt-4'>
//                         <div className={`max-w-xs w-full bg-indigo-500 text-white' shadow-md rounded-lg p-3`}>
//                             <div className='text-sm'>{prompt}</div>
//                         </div>
//                     </div>
//                 }
//             </div>
//             <div className="bg-gray-300 py-2 px-4">
//                 <form className='flex'>
//                     <input
//                         type="text"
//                         className="w-full py-2 px-4 rounded-lg border-2 border-gray-600 focus:outline-none focus:border-indigo-500"
//                         placeholder="Type your message here..."
//                         onChange={handleChange}
//                     />
//                     <button className="mx-2 justify-end" onClick={handleSubmit}><img src="https://img.icons8.com/ios-glyphs/30/null/sent.png" /></button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Chat;
import { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const API_KEY = "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";
// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
    "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience."
}

function Chat() {
    const [messages, setMessages] = useState([
        {
            message: "Hello, I'm ChatGPT! Ask me anything!",
            sentTime: "just now",
            sender: "ChatGPT"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async (message) => {
        const newMessage = {
            message,
            direction: 'outgoing',
            sender: "user"
        };

        const newMessages = [...messages, newMessage];

        setMessages(newMessages);

        // Initial system message to determine ChatGPT functionality
        // How it responds, how it talks, etc.
        setIsTyping(true);
        await processMessageToChatGPT(newMessages);
    };

    async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
        // Format messages for chatGPT API
        // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
        // So we need to reformat

        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "ChatGPT") {
                role = "assistant";
            } else {
                role = "user";
            }
            return { role: role, content: messageObject.message }
        });


        // Get the request body set up with the model we plan to use
        // and the messages which we formatted above. We add a system message in the front to'
        // determine how we want chatGPT to act. 
        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,  // The system message DEFINES the logic of our chatGPT
                ...apiMessages // The messages from our chat with ChatGPT
            ]
        }

        await fetch("https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiRequestBody)
            }).then((data) => {
                return data.json();
            }).then((data) => {
                console.log(data);
                setMessages([...chatMessages, {
                    message: data.choices[0].message.content,
                    sender: "ChatGPT"
                }]);
                setIsTyping(false);
            });
    }

    return (
        <div className="chat">
            <div style={{ position: "relative", height: "90vh", width: "700px","margin":"auto" }}>
                <MainContainer>
                    <ChatContainer>
                        <MessageList
                            scrollBehavior="smooth"
                            typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
                        >
                            {messages.map((message, i) => {
                                console.log(message)
                                return <Message key={i} model={message} />
                            })}
                        </MessageList>
                        <MessageInput placeholder="Type message here" onSend={handleSend} />
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    )
}

export default Chat
