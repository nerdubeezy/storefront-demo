import React from "react";

export default class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.cartTotal = this.cartTotal.bind(this);
  }
  cartTotal() {
    let cart = this.props.cart;
    let total = 0;
    let quantity = 0;
    cart.map(item => {
      quantity += parseFloat(item.quantity);
      total += parseFloat(item.product.price) * item.quantity;
    });
    return { total, quantity };
  }
  render() {
    let { total, quantity } = this.cartTotal();
    return (
      <div id="cart">
        <header className="cart-header">
          <p>Cart</p>
          <i class="fas fa-shopping-cart" />
          <div id="quantity">{quantity}</div>
        </header>
        <ul>
          {this.props.cart &&
            Object.values(this.props.cart).map((item, i) => (
              <li key={item.product._id}>
                <div className="cart-thumb">
                  <div className="cart-item-name">{item.product.name}</div>
                  <img src={item.product.image} />
                </div>
                <div className="cart-item-price">${item.product.price}</div>
                <div className="times">
                  <p>x</p>
                </div>
                <div className="quantity">
                  <label for="quantity">Quantity</label>
                  <input
                    type="number"
                    defaultValue="1"
                    name="quantity"
                    data-id={item.product._id}
                    onChange={this.props.changeQuantity}
                  />
                </div>
                <div
                  className="delete-button"
                  data-id={item.product._id}
                  onClick={this.props.removeItem}
                >
                  <i class="fas fa-times-circle" data-id={item.product._id} />
                </div>
              </li>
            ))}
          <footer className="cart-footer">
            <div className="cart-total">total: ${total}</div>
            <button className="cart-checkout">Checkout</button>
          </footer>
        </ul>
      </div>
    );
  }
}
