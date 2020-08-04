import React, { Component } from "react";

class CartComponent extends Component {
  state = {
    // style : { itemImg : { width:120,height:120 } }
  };

  render() {
    const { item, onIncrement, onDecrement, onDelete } = this.props;
    return (
      <div
        className="card text-center p-3 mx-3 my-2 border-0 shadow-sm"
        style={{ width: "12em", backgroundColor: "#F4C4D4" }}
      >
        <div className="d-flex flex-column">
          <img
            src={item.img}
            alt=""
            className="img-fluid"
            style={{ width: "10em", height: "8em" }}
          />
          <div className="d-flex flex-column mt-3 align-items-center text-dark">
            <h5 className="">{item.name}</h5>
            <div className="text-center">
              <button
                onClick={() => onIncrement(item.id)}
                className="btn btn-primary px-2 mx-2 my-2"
                style={{ fontSize: 12 }}
              >
                <i className="fa fa-plus" aria-hidden="true"></i>
              </button>
              <h5
                className="btn btn-warning mx-2 my-2"
                style={{ fontSize: 16, backgroundColor: "#F4D35E" }}
              >
                {item.quantity}
              </h5>
              <button
                onClick={() => onDecrement(item.id)}
                className="btn btn-secondary px-2 mx-2 my-2"
                style={{ fontSize: 12 }}
              >
                <i className="fa fa-minus" aria-hidden="true"></i>
              </button>
            </div>
            <h4 className="m-2">
              Total&nbsp;:&nbsp;
              <span className="badge badge-success">
                ₹{item.price * item.quantity}
              </span>
            </h4>
            <button
              onClick={() => onDelete(item.id)}
              className="btn text-danger px-1 mx-2"
              style={{ fontSize: 12 }}
            >
              <b>Remove</b>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CartComponent;
