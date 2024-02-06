import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthUserProvider } from "./Context/authUserContext.jsx";
import { ListProvider } from "./Context/listContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthUserProvider>
      <ListProvider>
        <App />
      </ListProvider>
    </AuthUserProvider>
  </BrowserRouter>
);
