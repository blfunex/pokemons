import React from "react";
import ReactDOM from "react-dom";

import { QueryClient, QueryClientProvider } from "react-query";

import "./root.css";

import App from "./App";

const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

/* eslint-disable no-restricted-globals */
// Just for my website, it does not reroute to https.
if (
  location.protocol !== "https:" &&
  !location.host.startsWith("localhost")
) {
  location.href = location.href.replace("http://", "https://");
}
