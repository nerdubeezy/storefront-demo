import React from "react";

export default class Nav extends React.Component {
  render() {
    return (
      <nav className="site-nav">
        <ul>
          <li className="site-logo">
            <i className="fas fa-box-open" />
            <p className="site-title">AweBoxx</p>
          </li>
          <li>Home</li>
          <li>Store</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    );
  }
}
