import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RoomProvider } from "./contexts/RoomContext";
import VideoControlesContextProvider from "./contexts/VideoControlesContext";

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <React.StrictMode>
    <BrowserRouter>
      <RoomProvider>
        <VideoControlesContextProvider>
          <QueryClientProvider client={new QueryClient()}>
            <App />
            { import.meta.env.DEV && <ReactQueryDevtools 
                initialIsOpen={false} 
                buttonPosition="bottom-left" 
            /> }
          </QueryClientProvider>
        </VideoControlesContextProvider>
      </RoomProvider>
    </BrowserRouter>
  </React.StrictMode>
);