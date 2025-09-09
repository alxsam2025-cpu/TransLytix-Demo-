import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import LiveFeedProvider from "./live/LiveFeedProvider";
import "./index.css"; // Tailwind + Leaflet + custom styles

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LiveFeedProvider>
      <App />
    </LiveFeedProvider>
  </React.StrictMode>
);
