import React, { Component } from "react";

class Item extends Component {
  handlequantity = () => {
    const { item, quantity, onIncrement, onDecrement, onDelete } = this.props;
    return (
      <div>
        <div className="col-12 text-center">
          <button
            onClick={() => onIncrement(item.id)}
            className="btn btn-primary px-2 mx-2 my-2"
            style={{ fontSize: 16 }}
          >
            <i className="fa fa-plus" aria-hidden="true"></i>
          </button>
          <h5
            className="btn btn-warning mx-2 my-2"
            style={{ fontSize: 20, backgroundColor: "#F4D35E" }}
          >
            {quantity}
          </h5>
          <button
            onClick={() => onDecrement(item.id)}
            className="btn btn-secondary px-2 mx-2 my-2"
            style={{ fontSize: 16 }}
          >
            <i className="fa fa-minus" aria-hidden="true"></i>
          </button>
        </div>
        <h4 className="m-2">
          Total&nbsp;:&nbsp;
          <span className="badge badge-success">₹{item.price * quantity}</span>
        </h4>
        <button
          onClick={() => onDelete(item.id)}
          className="btn text-danger px-1 mx-2"
          style={{ fontSize: 16 }}
        >
          <b>Remove from Cart</b>
        </button>
      </div>
    );
  };

  render() {
    const { item, quantity, onIncrement } = this.props;
    return (
      <div
        className="card text-center p-3 m-3 border-0 shadow-sm"
        style={{ width: "20em", backgroundColor: "#F4C4D4" }}
      >
        <img
          src={item.img}
          style={{ width: 150, height: 150 }}
          className="mx-auto img-fluid rounded-circle"
          alt=""
        />
        <h3 className="mt-2 mb-3">
          <b>{item.name}</b>
        </h3>
        <p>
          Price&nbsp;&nbsp;
          <span className="badge badge-info p-2" style={{ fontSize: 14 }}>
            ₹{item.price}
          </span>
          &nbsp;&nbsp;{item.priceDescription}
        </p>
        {quantity === 0 && (
          <button
            onClick={() => onIncrement(item.id)}
            className="btn btn-success m-1"
          >
            Add to Cart
          </button>
        )}
        {quantity !== 0 && this.handlequantity()}
      </div>
    );
  }
}

export default Item;
