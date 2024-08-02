import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ChatProvider from "./context/ChatProvider";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { ContextProvider } from "./SocketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <React.StrictMode>
      <BrowserRouter>
        {/* <ContextProvider> */}
        <ChatProvider>
          <App />
        </ChatProvider>
        {/* </ContextProvider> */}
      </BrowserRouter>
    </React.StrictMode>
  </ChakraProvider>
);
