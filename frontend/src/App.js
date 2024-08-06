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
import ExpertRequests from "./components/ExpertRequests";
import ExpertCalls from "./components/ExpertCalls";
import FarmerCalls from "./components/FarmerCalls";
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
      <Route path="/requests" element={<ExpertRequests />} />
      <Route path="/farmer-calls" element={<FarmerCalls />} />
      <Route path="/expert-calls" element={<ExpertCalls />} />
      <Route
        path="/join-call/:roomId"
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
