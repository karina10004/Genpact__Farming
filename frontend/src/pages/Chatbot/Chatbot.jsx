import React, { useState } from "react";
import gptLogo from './assets/assets/chatgpt.svg';
import addBtn from './assets/assets/add-30.png';
import msgIcon from './assets/assets/message.svg';
import home from './assets/assets/home.svg';
import saved from './assets/assets/bookmark.svg';
import rocket from './assets/assets/rocket.svg';
import sendBtn from './assets/assets/send.svg';
import userIcon from './assets/assets/user-icon.png';
import gptImgLogo from './assets/assets/chatgptLogo.svg';
import {sendMsgToOpenAi} from './openai';
import './Chatbot.css';
function Chatbot() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([
    {
    text: "hi",
    isBot: true,
    }
]);

  const handleSend = async() => {
    const text = input;
    setInput('');
    setMessage([
      ...message,
      {
        text,
        isBot: false,
      }
    ])
    const res = await sendMsgToOpenAi(input);
    console.log(res);
    setMessage([
      ...message,
      {
        text: input,
        isBot: false,
      },
      {
        text: res,
        isBot: true,
      }
    ]);
  }


  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src= {gptLogo} alt="logo" className="logo" />
            <span className="brand">
              ChatGPT
            </span>
          </div>

          <button className="midBtn">
            <img src={addBtn} alt="newChat" className="addBtn" />
            New Chat
          </button>
          

          <div className="upperSideBottom">

            <button className="query">
              <img src= {msgIcon} alt="query" className="" />
              What is Programming?
            </button>

            <button className="query">
              <img src={msgIcon} alt="query" className="" />
              How to use Api?
            </button>

          </div>

        </div>

        <div className="lowerSide">
          <div className="listItem">
            <img src={home} alt="Home" className="listitemsImg" />
              Home
          </div>

          <div className="listItem">
            <img src={saved} alt="Save" className="listitemsImg" />
              Saved
          </div>

          <div className="listItem">
            <img src={rocket} alt="Upgrade" className="listitemsImg" />
              Upgrade to pro
          </div>

        </div>
      </div>

      <div className="main">
        <div className="chats">
          
          {message.map((message, i) => 
            <div key={i} className={`chat ${message.isBot ? "bot" : ""}`}>
              <img className="chatimg" src={message.isBot ? gptImgLogo : userIcon} alt="" />
              <p className="txt">
                {message.text}
              </p>
            </div>
          )}
        </div>

        <div className="chatFotter">
          <div className="inp">
            <input type="text" placeholder="Send a message" value={input} onChange={(e) => {setInput(e.target.value)}}/>
            <button className="send">
              <img src={sendBtn} alt="send" onClick={handleSend} />
            </button>
          </div>
          <p>ChatBot may produce inaccurate information about people, places, or facts.</p>
        </div>
      </div>

    </div>
  );
}

export default Chatbot;
