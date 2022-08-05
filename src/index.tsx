import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { createServer, Response } from "miragejs";

createServer({
  routes() {
    this.namespace = "api";
    this.timing = 2000;

    this.post("/login", () => {
      return {
        token: "5432",
        refreshToken: "sgsdgsdg",
        user: {
          firstname: "aaa",
          lastname: "bbb",
          email: "aaa@bbb.com",
        },
      };
    });

    this.post("/logout", () => new Response(200));
  },
});

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
