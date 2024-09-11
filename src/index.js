import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Components/App/App";
import reportWebVitals from "./reportWebVitals";

/**
 * The root element of the application is rendered into the DOM.
 * The `App` component is wrapped in `React.StrictMode` to highlight potential issues in an application.
 *
 * @constant
 * @type {ReactDOM.Root}
 */
const root = ReactDOM.createRoot(document.getElementById("root"));

/**
 * Renders the root component `App` inside `StrictMode`, which activates additional checks and warnings for its descendants.
 */
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/**
 * Starts measuring performance in the app and logs results (such as reporting web vitals).
 * For more information: https://bit.ly/CRA-vitals
 */
reportWebVitals();
