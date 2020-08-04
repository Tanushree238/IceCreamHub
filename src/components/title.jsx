import React, { Component } from "react";

class Title extends Component {
  render() {
    const { totalItems, totalAmount, showCart } = this.props;
    return (
      <nav
        className="navbar navbar-light text-dark py-1"
        style={{ backgroundColor: "#083D77" }}
      >
        <a className="navbar-brand  text-light" href="#">
          <b>IceCream Hub</b>
        </a>
        <div className="px-3">
          <span style={{ fontSize: 20 }} className="badge badge-info mx-3">
            ₹{totalAmount}
          </span>
          <button onClick={showCart} className="btn">
            <span style={{ fontSize: 33, position: "relative" }}>
              <i
                className="fa fa-shopping-cart text-light"
                aria-hidden="true"
              ></i>
              <span
                style={{
                  fontSize: 12,
                  position: "absolute",
                  top: -3,
                  right: -10,
                }}
                className="badge badge-warning"
              >
                {totalItems}
              </span>
            </span>
          </button>
        </div>
      </nav>
    );
  }
}

export default Title;
