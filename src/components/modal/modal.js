import React from 'react';
import uuid from 'uuid/v4';

import Form from '../form/form.js';

import './modal.css';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  buildTransaction = () => {
    let doc = {
      companyCode: 'DEVGUIDE',
      code: uuid(),
      type: 'SalesOrder',
      date: new Date(),
      customerCode: 'EXAMPLECUSTOMER',
      addresses: {
        shipFrom: {
          line1: '100 Ravine Lane NE',
          city: 'Bainbridge Island',
          region: 'WA',
          country: 'US',
          postalCode: '98110',
        },
        shipTo: {
          line1: '18300 Von Karman Ave',
          city: 'Irvine',
          region: 'CA',
          country: 'US',
          postalCode: '92630',
        },
      },
      lines: [
        {
          amount: 5,
        },
      ],
    };
  }

  beginTransaction = async () => {

    let doc = {
      companyCode: 'DEVGUIDE',
      code: uuid(),
      type: 'SalesOrder',
      date: new Date(),
      customerCode: 'EXAMPLECUSTOMER',
      addresses: {
        shipFrom: {
          line1: '100 Ravine Lane NE',
          city: 'Bainbridge Island',
          region: 'WA',
          country: 'US',
          postalCode: '98110',
        },
        shipTo: {
          line1: '18300 Von Karman Ave',
          city: 'Irvine',
          region: 'CA',
          country: 'US',
          postalCode: '92630',
        },
      },
      lines: [
        {
          amount: 5,
        },
      ],
    };
    // let returnedStuff = await post(doc);
    // console.log(returnedStuff);
    // let amount = returnedStuff.totalAmount;
    // console.log('AMOUNT', amount);
    // let taxAmount = returnedStuff.totalTax;
    // let total = amount + taxAmount;
    // return this.setState({ amount, taxAmount, total });
  }

  render() {
    return (
      <section onClick={(e) => this.props.toggleCartModal(e)} className="modal-wrapper">
        <div className="modal-container">
          <Form />
        </div>
      </section>
    );
  }
}