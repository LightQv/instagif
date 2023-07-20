import React from "react";
import ReactDOM from "react-dom/client";
import CustomRouter from "./components/routes/CustomRouter";
import customHistory from "./services/history";
import { UserContextProvider } from "./contexts/UserContext";
import { LikeContextProvider } from "./contexts/LikeContext";
import { ThemeContextProvider } from "./contexts/ThemeContext";

import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CustomRouter history={customHistory}>
      <UserContextProvider>
        <LikeContextProvider>
          <ThemeContextProvider>
            <App />
          </ThemeContextProvider>
        </LikeContextProvider>
      </UserContextProvider>
    </CustomRouter>
  </React.StrictMode>
);
