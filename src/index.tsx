/* eslint-disable no-restricted-globals */

import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

if (
  location.protocol !== "https:" &&
  !location.host.startsWith("localhost")
) {
  location.href = location.href.replace("http://", "https://");
}
