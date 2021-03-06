import './store.css';

import React from 'react';
import * as Spinners from 'react-spinners';

import * as api from '../../lib/api.js';
import * as utils from '../../lib/utils.js';

import Cart from '../cart/cart.js';
import Categories from '../categories/categories.js';
import Modal from '../modal/modal.js';
import Nav from '../nav/nav.js';
import Products from '../products/products.js';

export default class Store extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      loading: false,
      showCartModal: false,
    };

    this.getProducts = this.getProducts.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.quatityOnCart = this.quatityOnCart.bind(this);
    // this.cartTotal = this.cartTotal.bind(this);
  }

  // componentDidUpdate() {
  //   console.log('__STATE__', this.state);
  //   console.log('__CART__', this.state.cart);
  // }

  async componentWillMount() {
    this.setState({loading: true});
    let payload = { model: 'categories' };
    let categories = await api.get(payload);

    this.setState({ categories, loading: false});
  }

  async getProducts(e) {
    this.setState({ loading: true });
    let payload = { model: 'categories', id: e.target.dataset.id };
    let category = await api.get(payload);
    let products = category.products;
    this.setState({ products, loading: false });
  }

  addToCart(e) {
    let productId = e.target.id;
    let products = this.state.products;
    let product = null;

    products.forEach(item => {
      if (item._id === productId) {
        product = item;
      }
    });

    let cart = this.state.cart || [];
    let add = true;

    cart.forEach(el => {
      if (el.product._id === productId) {
        add = false;
      }
    });

    if (add) {
      this.setState({
        cart: [...this.state.cart, { product: product, quantity: 1 }],
      });
    } else {
      alert('This product is already in your cart');
    }
    add = true;
  }

  removeFromCart(e) {
    let productId = e.target.dataset.id;

    let cart = this.state.cart.filter(item => item.product._id !== productId);
    this.setState({ cart });
  }
  quatityOnCart(e) {
    let productId = e.target.dataset.id;
    let quantity = e.target.value;

    let cart = [...this.state.cart];

    cart.forEach(product => {
      if (product.product._id === productId) {
        product.quantity = quantity;
      }
    });

    this.setState({ cart: [...cart] });
  }

  toggleCartModal = e => {
    let targetEl = e.target.tagName;
    targetEl === 'SECTION' || targetEl === 'BUTTON'
      ? this.state.showCartModal ? this.setState({ showCartModal: false }) : this.setState({ showCartModal: true })
      : null;
  }

  render() {
    let products = this.state.products || [];
    return (
      <React.Fragment>
        {
          this.state.showCartModal ? <Modal content={this.state.cart} toggleCartModal={this.toggleCartModal} /> : null
        }
        <Nav />
        <section id="store">
          {
            utils.renderIf(
              this.state.loading,
              <div className='sweet-loading'>
                <Spinners.BarLoader className="spinner" size={160} color={'#0a0a0a'} />
              </div>
            )
          }
          <Categories
            categories={this.state.categories}
            getProducts={this.getProducts}
          />
          {
            utils.renderIf(
              products && products.length, 
              <Products products={products} addtocart={this.addToCart} />
            )
          }
          <Cart
            cart={this.state.cart}
            changeQuantity={this.quatityOnCart}
            removeItem={this.removeFromCart}
            toggleCartModal={this.toggleCartModal}
          />
        </section>
      </React.Fragment>
    );
  }
}
