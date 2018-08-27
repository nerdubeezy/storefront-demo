import React from 'react';
import './products.css';

export default class Products extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <div id="listings">
          <ul>
            {this.props.products &&
            this.props.products.map((product, i) => (
              <li key={product._id}>
                <div className="single-product">
                  <h3>{product.name}</h3>
                  <img className="product-image" src={product.image} />
                  <p className="product-description">{product.description}</p>
                  <footer>
                    <div className="price">Price: ${product.price}</div>
                    <button id={product._id} onClick={this.props.addtocart}>
                      Add to Cart
                    </button>
                  </footer>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <hr />
      </React.Fragment>
    );
  }
}
