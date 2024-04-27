import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import SearchContext from "context/search";
// import { Provider } from "react-redux";
// import { store } from "state/store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>
  // <Provider store={store}>
  <SearchContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </SearchContext>
  // </Provider>
  // </React.StrictMode>
);
