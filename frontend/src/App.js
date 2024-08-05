import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Chatpage from "./pages/chatpage";
import "./App.css";
import Video from "./Video";
import News from "./pages/News";
import { ContextProvider } from "./SocketContext";
import ExpertLogin from "../src/components/Authentication/ExpertLogin";
import ExpertRegsiter from "../src/components/Authentication/ExpertRegistration";
import ExpertList from "./components/expertlist";
function App() {
  return (
    //<Router>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/chats" element={<Chatpage />} />
      {/* <ContextProvider> */}
      <Route path="/news" element={<News />} />
      <Route path="/expertlogin" element={<ExpertLogin />} />
      <Route path="/expertregister" element={<ExpertRegsiter />} />
      <Route path="/experts" element={<ExpertList />} />
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
