import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.jsx";
import { persistor, store } from "./components/redux/store.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <PersistGate persistor={persistor}>
    <Router>
      <App />
    </Router>
  </PersistGate>
  </Provider>
);
