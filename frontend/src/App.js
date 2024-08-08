import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Chatpage from "./pages/chatpage";
import "./App.css";
import Video from "./Video";
import News from "./pages/NewsPages/News";
import { ContextProvider } from "./SocketContext";
import ExpertLogin from "../src/components/Authentication/ExpertLogin";
import ExpertRegsiter from "../src/components/Authentication/ExpertRegistration";
import ExpertList from "./components/expertlist";
import ExpertRequests from "./components/ExpertRequests";
import ExpertCalls from "./components/ExpertCalls";
import FarmerCalls from "./components/FarmerCalls";
import GS from "./pages/GovermentScheme/GovernmentScheme";
import WeatherPage from "./pages/WeatherPage/WeatherPage";
import Blog from "./components/Blog/AddBlock";
import BlogPosts from "./components/Blog/BlogPosts";
import SingleBlog from "./components/Blog/BlogPost";
import Home from "./components/home/Home";
import Fertilizer from "./components/FertilizerRecommendation";
import Crop from "./components/CropPredictionForm";
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
      <Route path="/Blog" element={<Blog />} />
      <Route path="/blog/:id" element={<SingleBlog />} />
      <Route path="/BlogPost" element={<BlogPosts />} />
      <Route path="/requests" element={<ExpertRequests />} />
      <Route path="/farmer-calls" element={<FarmerCalls />} />
      <Route path="/expert-calls" element={<ExpertCalls />} />
      <Route path="/GS" element={<GS />} />
      <Route path="/Weather" element={<WeatherPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/fertilizer" element={<Fertilizer />} />
      <Route path="/crop" element={<Crop />} />
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
