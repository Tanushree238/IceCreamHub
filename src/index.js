import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import io from "socket.io-client";

var socket = io("http://18.217.85.9:5000/test");

socket.on("connect", () => {
  console.log("Connected!!!");
});

ReactDOM.render(
  <App
    socket={socket}
    ref={(App) => {
      window.App = App;
    }}
  />,
  document.getElementById("root")
);

socket.on("updateHandler", ({ data }) => {
  const prevStates = { ...window.App.state };
  delete prevStates["cartState"];
  delete prevStates["open"];
  delete prevStates["items"];
  delete prevStates["coupon"];
  if (JSON.stringify(prevStates) !== JSON.stringify(data)) {
    window.App.setState({
      cartItems: [...data.cartItems],
      couponApplied: [...data.couponApplied],
      cartCredits: { ...data.cartCredits },
      GST: data.GST,
    });
  }
});
