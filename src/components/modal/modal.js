import './modal.css';

import React from 'react';
import uuid from 'uuid/v4';

import Form from '../form/form.js';

import {post} from '../../lib/avatax.api.js';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: true,
      content: {},
      totalTax: 0,
      subTotal: 0,
      grandTotal: 0,
    };
  }

  componentDidUpdate() {
    console.log('__MODAL_STUFF__', this.state.content);
  }
  toggleForm = () => {
    this.state.showForm ? this.setState({showForm: false}) : this.setState({showForm: true});
  }

  buildTransaction = async addressToShip => {

    let lines = this.props.content.map( (item, i) => {
      let product = {};
      product.number = i + 1;
      product.quantity = parseInt(item.quantity);
      product.amount = parseInt(item.quantity * item.product.price);
      return product;
    });

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
        shipTo: addressToShip,
      },
      lines: lines,
    };

    let taxInfo = await this.createTransaction(doc);
    let items = {};


    let totalTax = taxInfo.totalTax;
    let subTotal = taxInfo.totalTaxable;
    let grandTotal = totalTax + subTotal;

    this.props.content.forEach((content, i) => {
      let name = content.product.name;
      items[name] = {
        quantity: content.quantity,
        price: content.product.price,
        itemTax: taxInfo.lines[i].tax,
        sub: content.product.price * content.quantity,
      };
    });

    this.setState({content: items, totalTax, subTotal, grandTotal});
  }

  createTransaction = async (doc) => {
    let returnedStuff = await post(doc);
    return returnedStuff;
  }

  render() {
    return (
      <section className="modal-wrapper" onClick={(e) => this.props.toggleCartModal(e)}>
        <div className="modal-container">
          {
            this.state.showForm ? <Form handler={this.buildTransaction} toggle={this.toggleForm}/> : null
          }
          {
            Object.keys(this.state.content).length ?
              <React.Fragment>
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Sub</th> 
                      <th>Tax</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      Object.keys(this.state.content).map((key, i) =>
                        <tr key={i}>
                          <td>{key}</td>
                          <td>{this.state.content[key].quantity}</td>
                          <td>{this.state.content[key].price}</td>
                          <td>{this.state.content[key].sub}</td>
                          <td>{this.state.content[key].itemTax}</td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>
                <footer>
                  <div>
                    <header>Sub Total</header>
                    <p>{this.state.subTotal}</p>
                  </div>
                  <div>
                    <header>Tax Total</header>
                    <p>{this.state.totalTax}</p>
                  </div>
                  <div>
                    <header>Total</header>
                    <p>{this.state.grandTotal}</p>
                  </div>
                </footer>
              </React.Fragment>
              : null
          }
        </div>
      </section>
    );
  }
}