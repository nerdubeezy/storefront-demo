import React from 'react';

import './modal.css';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  

  render() {
    return (
      <section onClick={this.props.toggleCartModal} className="modal-wrapper">
        <div className="modal-container">
          <p>Here is some text</p>
        </div>
      </section>
    );
  }
}