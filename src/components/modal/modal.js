import React from 'react';

import './modal.css';

export default class Modal extends React.Component {
  render() {
    return (
      <section className="modal-wrapper">
        <div className="modal-container">
          <p>Here is some text</p>
        </div>
      </section>
    );
  }
}