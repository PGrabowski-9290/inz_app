import React from 'react';
import ReactDOM from 'react-dom/client';
import { VechaiProvider } from "@vechaiui/react";

import "./style.css"
import App from "./components/App"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <VechaiProvider>
      <App />
    </VechaiProvider>
  </>
);