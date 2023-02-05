import { colors, extendTheme, VechaiProvider } from "@vechaiui/react";
import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";
import "./index.css";

const light = {
  id: "light",
  type: "light",
  colors: {    
    bg: {      
      base: colors.gray["800"],      
      fill: colors.gray["900"],    
    },    
    text: {      
      foreground: colors.gray["100"],      
      muted: colors.gray["300"],    
    },    
    primary: colors.indigo,    
    neutral: colors.gray,  
  },
}

const theme = extendTheme({
  cursor: "pointer",
  colorSchemes: {
    light
  }
})

ReactDOM.render(
  <React.StrictMode>
    <VechaiProvider theme={theme} colorScheme="light">
      <App />
    </VechaiProvider>
  </React.StrictMode>,
  document.getElementById('root')
);