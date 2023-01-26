import { VechaiProvider } from "@vechaiui/react";
import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";
import "./index.css";


ReactDOM.render(
  <>
    <VechaiProvider>
      <App />
    </VechaiProvider>
  </>,
  document.getElementById('root')
);