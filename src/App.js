import React, { Component } from "react";
import Title from "./components/title";
import Cart from "./components/cart_modal";
import Item from "./components/counterComponent";
import "./App.css";
import item1 from "./images/chocolate.jpg";
import item2 from "./images/vanila.jpg";
import item3 from "./images/mango.jpg";
import item4 from "./images/strawberry.jpg";
import item5 from "./images/chocochip.jpg";
import item6 from "./images/mintchocochip.jpg";
import item7 from "./images/butterscotch.jpg";
import item8 from "./images/blackcurrent.jpg";
import item9 from "./images/oreo.jpg";

class App extends Component {
  componentDidUpdate(prevProps, prevStates) {
    delete prevStates["cartState"];
    delete prevStates["open"];
    delete prevStates["items"];
    delete prevStates["coupon"];
    const currentStates = { ...this.state };
    delete currentStates["cartState"];
    delete currentStates["open"];
    delete currentStates["items"];
    delete currentStates["coupon"];
    if (JSON.stringify(prevStates) !== JSON.stringify(currentStates)) {
      this.props.socket.emit("updateData", currentStates);
    }
  }
  state = {
    open: false,
    cartState: false,
    coupon: [
      { id: 1, name: "ICY20", discount: 20 },
      { id: 2, name: "CREAMY50", discount: 50 },
    ],
    couponApplied: [],
    GST: 18,
    cartCredits: {
      value: 150,
      status: false,
    },
    cartItems: [
      {
        id: 1,
        img: item1,
        name: "Chocolate",
        price: 120,
        priceDescription: "Per 2 Scoops",
        quantity: 2,
      },
    ],
    items: [
      {
        id: 1,
        img: item1,
        name: "Chocolate",
        price: 120,
        priceDescription: "Per 2 Scoops",
      },
      {
        id: 2,
        img: item2,
        name: "Vanilla",
        price: 100,
        priceDescription: "Per 2 Scoops",
      },
      {
        id: 3,
        img: item3,
        name: "Mango",
        price: 130,
        priceDescription: "Per 2 Scoops",
      },
      {
        id: 4,
        img: item4,
        name: "Strawberry",
        price: 90,
        priceDescription: "Per 2 Scoops",
      },
      {
        id: 5,
        img: item5,
        name: "Chocochip",
        price: 250,
        priceDescription: "Per 2 Scoops",
      },
      {
        id: 6,
        img: item6,
        name: "Mint & Chocochip",
        price: 260,
        priceDescription: "Per 2 Scoops",
      },
      {
        id: 7,
        img: item7,
        name: "Butter Scotch",
        price: 180,
        priceDescription: "Per 2 Scoops",
      },
      {
        id: 8,
        img: item8,
        name: "Black Current",
        price: 200,
        priceDescription: "Per 2 Scoops",
      },
      {
        id: 9,
        img: item9,
        name: "Oreo",
        price: 300,
        priceDescription: "Per 2 Scoops",
      },
    ],
  };

  handleCouponValidation = (name) => {
    const coupon = this.state.coupon.filter(
      (c) => c.name === name.toUpperCase()
    );
    if (coupon.length === 0) {
      return false;
    } else {
      this.setState({ couponApplied: coupon });
      return true;
    }
  };

  handleRemoveCoupon = (name) => {
    const coupon = this.state.coupon.filter((c) => c.name === name);
    if (coupon.length !== 0) {
      this.setState({ couponApplied: [] });
    }
  };

  handleCartCreditsStatusToggle = () => {
    const cartCredits = { ...this.state.cartCredits };
    cartCredits.status = this.state.cartCredits.status ? false : true;
    this.setState({ cartCredits });
  };

  getItemQuantity = (id) => {
    const item = this.state.cartItems.filter((c) => c.id === id);
    if (item.length === 0) return 0;
    return item[0].quantity;
  };

  getTotalAmount = () => {
    let totalAmount = 0;
    this.state.cartItems.forEach((item) => {
      const price = this.state.items.filter((c) => c.id === item.id)[0].price;
      totalAmount += price * item.quantity;
    });
    return totalAmount;
  };

  getTotalItems = () => {
    let totalItems = 0;
    this.state.cartItems.forEach((item) => {
      const price = this.state.items.filter((c) => c.id === item.id)[0].price;
      totalItems += item.quantity;
    });
    return totalItems;
  };

  handleIncrement = (id) => {
    let item = this.state.cartItems.filter((c) => c.id === id);
    if (item.length > 0) {
      item = item[0];
      const cartItems = [...this.state.cartItems];
      const index = cartItems.indexOf(item);
      cartItems[index] = { ...item };
      cartItems[index].quantity++;
      this.setState({ cartItems });
    } else {
      const cartItems = [...this.state.cartItems];
      item = this.state.items.filter((c) => c.id === id)[0];
      item["quantity"] = 1;
      cartItems.push(item);
      this.setState({ cartItems });
    }
  };

  handleDecrement = (id) => {
    let item = this.state.cartItems.filter((c) => c.id === id);
    if (item.length > 0) {
      item = item[0];
      if (item.quantity > 1) {
        const cartItems = [...this.state.cartItems];
        const index = cartItems.indexOf(item);
        cartItems[index] = { ...item };
        cartItems[index].quantity--;
        this.setState({ cartItems });
      } else if (item.quantity === 1) {
        const cartItems = this.state.cartItems.filter((c) => c.id !== id);
        this.setState({ cartItems });
      }
    }
  };

  handleDelete = (id) => {
    let item = this.state.cartItems.filter((c) => c.id === id);
    if (item.length > 0) {
      const cartItems = this.state.cartItems.filter((c) => c.id !== id);
      this.setState({ cartItems });
    }
  };

  handleShowCart = () => {
    this.setState({ cartState: true });
  };

  handleHideCart = () => {
    this.setState({ cartState: false });
  };

  render() {
    return (
      <React.Fragment>
        <Title
          totalItems={this.state.cartItems.length}
          totalAmount={this.getTotalAmount()}
          showCart={this.handleShowCart}
        />
        <Cart
          cartState={this.state.cartState}
          hideCart={this.handleHideCart}
          cartItems={this.state.cartItems}
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
          onDelete={this.handleDelete}
          totalAmount={this.getTotalAmount()}
          totalItems={this.getTotalItems()}
          couponApplied={this.state.couponApplied}
          removeCoupon={this.handleRemoveCoupon}
          validateCoupon={this.handleCouponValidation}
          cartCredits={this.state.cartCredits}
          cartCreditsStatusToggle={this.handleCartCreditsStatusToggle}
          GST={this.state.GST}
        />
        <main className="container">
          <div className="d-flex flex-wrap flex-row  justify-content-center m-4">
            {this.state.items.map((item) => (
              <Item
                key={item.id}
                item={item}
                quantity={this.getItemQuantity(item.id)}
                onIncrement={this.handleIncrement}
                onDecrement={this.handleDecrement}
                onDelete={this.handleDelete}
              />
            ))}
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
