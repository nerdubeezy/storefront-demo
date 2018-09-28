import React from 'react';
import './categories.css';

export default class Categories extends React.Component {
  render() {
    let photos = [
      'https://uploads.codesandbox.io/uploads/user/0e04c500-acae-46eb-94c9-487a92ae8cfa/BvJp-clothing.jpg',
      'https://uploads.codesandbox.io/uploads/user/0e04c500-acae-46eb-94c9-487a92ae8cfa/nxjB-electronics.jpg',
      'https://uploads.codesandbox.io/uploads/user/0e04c500-acae-46eb-94c9-487a92ae8cfa/UMTK-pharmacy.jpg',
      'https://uploads.codesandbox.io/uploads/user/0e04c500-acae-46eb-94c9-487a92ae8cfa/MVaw-accessory.jpg',
    ];
    return (
      <React.Fragment>
        <div id="categories">
          <ul>
            {this.props.categories &&
              this.props.categories.map((category, i) => (
                <li
                  key={category._id}
                  data-id={category._id}
                  id={category.name}
                  onClick={this.props.getProducts}
                >
                  <h3 data-id={category._id} className="category-title">
                    {category.name}
                  </h3>
                  <img src={photos[i]} alt={category.name} />
                </li>
              ))}
          </ul>
        </div>
        <hr />
      </React.Fragment>
    );
  }
}
