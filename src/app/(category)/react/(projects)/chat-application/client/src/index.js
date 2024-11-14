import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import ChatProvider from "./context/ChatProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChatProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </ChatProvider>
    </BrowserRouter>
  </React.StrictMode>
);
