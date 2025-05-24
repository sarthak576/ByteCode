import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.js"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = "6869876952-nrkehi1pqe7bcecbhpcsfcfsiem7nc2p.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <ChakraProvider theme={theme}> 
        <App />
      </ChakraProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
