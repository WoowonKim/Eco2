import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/index";
import { DndProvider } from "react-dnd";
import axios from "axios";
import ScrollTop from "./components/ScrollTop";
import { TouchBackend } from "react-dnd-touch-backend";

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <DndProvider
      backend={TouchBackend}
      options={{ enableMouseEvents: true, preview: true }}
    >
      <BrowserRouter>
        <ScrollTop />
        <App />
      </BrowserRouter>
    </DndProvider>
  </Provider>
);
