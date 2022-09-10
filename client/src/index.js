import React from 'react';
import ReactDOM from 'react-dom/client';
import { VechaiProvider } from "@vechaiui/react";

import App from "./components/App"
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <VechaiProvider>
      <App />
    </VechaiProvider>
  </>
);