import React, { Component } from "react";
import CartComponent from "./cart_components";
import emptyCart from "../images/empty_cart.png";
import PaymentBilling from "./payment_billing";

class Cart extends Component {
  render() {
    const {
      cartState,
      hideCart,
      onIncrement,
      onDecrement,
      onDelete,
      totalItems,
      totalAmount,
      validateCoupon,
      couponApplied,
      removeCoupon,
      cartCredits,
      cartCreditsStatusToggle,
      GST,
    } = this.props;
    const overlayStyle = cartState ? "block" : "none";
    return (
      <React.Fragment>
        <div
          className="modal"
          role="dialog"
          style={{
            display: overlayStyle,
            zIndex: 2,
            background: "rgba(0,0,0,0.8)",
            overflow: "auto",
          }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              {this.props.cartItems.length != 0 && (
                <div
                  className="modal-header text-light"
                  style={{ backgroundColor: "#083D77" }}
                >
                  <h5 className="modal-title">Cart</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={hideCart}
                    aria-label="Close"
                  >
                    <i
                      className="fa fa-times text-light"
                      aria-hidden="true"
                    ></i>
                  </button>
                </div>
              )}

              <div className="modal-body">
                {this.props.cartItems.length == 0 && (
                  <button
                    type="button"
                    className="close"
                    onClick={hideCart}
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                )}
                {this.props.cartItems.length === 0 && (
                  <div className="row w-100 m-0">
                    <img
                      src={emptyCart}
                      style={{ width: 200, height: 150 }}
                      className="mx-auto img-fluid"
                      alt=""
                    />
                  </div>
                )}

                {this.props.cartItems.length !== 0 && (
                  <div id="cart" className="rounded mx-auto">
                    <div className="cartItemContainer rounded d-flex justify-content-around flex-wrap">
                      {this.props.cartItems.map((item) => (
                        <CartComponent
                          key={item.id}
                          item={item}
                          onIncrement={onIncrement}
                          onDecrement={onDecrement}
                          onDelete={onDelete}
                        />
                      ))}
                    </div>
                    <hr />
                    <PaymentBilling
                      totalItems={totalItems}
                      totalAmount={totalAmount}
                      validateCoupon={validateCoupon}
                      couponApplied={couponApplied}
                      removeCoupon={removeCoupon}
                      cartCredits={cartCredits}
                      cartCreditsStatusToggle={cartCreditsStatusToggle}
                      GST={GST}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Cart;
