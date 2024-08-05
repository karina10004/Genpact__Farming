import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Chatpage from "./pages/chatpage";
import "./App.css";
import Video from "./Video";
import { ContextProvider } from "./SocketContext";

function App() {
  return (
    //<Router>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/chats" element={<Chatpage />} />
      {/* <ContextProvider> */}
      <Route path="/news" element={<News />} />
      <Route
        path="/video"
        element={
          <ContextProvider>
            {" "}
            <Video />
          </ContextProvider>
        }
      />
      {/* </ContextProvider> */}
    </Routes>
    // </Router>
  );
}

export default App;
