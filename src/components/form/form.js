import React from 'react';

import './form.css';

import { resolveAddress } from '../../lib/avatax.api.js';

export default class Form extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      line1: '11922 59th Ave E',
      city: 'Puyallup',
      region: 'WA',
      country: 'US',
      postalCode: 98373,

      _addressError: false,
    };
  }

  // componentDidUpdate() {
  //   console.log('__FORM_STATE__', this.state);
  // }

  validateAddress = async (address) => {
    
    let isValidated = false;
    
    let res = await resolveAddress(address);

    if (res.resolutionQuality === 'External' || res.resolutionQuality === 'NotCoded') {
      this.setState({ _addressError: true });
      isValidated = false;
    } else {
      isValidated = true;
    }

    return isValidated;
  } 

  handleChange = e => {

    if (this.state._addressError) { this.setState({_addressError: false}); }

    let name = e.target.name;
    let value = e.target.value || '';
    this.setState({[name]: value});
  }

  handleSubmit = async e => {
    e.preventDefault();

    let address = Object.assign({}, this.state);

    // SANITIZE STATE TO FIT ADDRESS
    delete address._addressError;
    
    let isVerified = await this.validateAddress(address);

    if (isVerified) { 
      if (this.props.handler) { this.props.handler(address); }
      if (this.props.toggle) { this.props.toggle(); }
    }

  }

  render() {
    return (
      <React.Fragment>
        <h3 className="form-title">Shipping Address:</h3>
        <form className={this.state._addressError ? 'error' : null} onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <label htmlFor="line1">Street
            <input type="text" name="line1" defaultValue={this.state.line1}/>
          </label>
          <label htmlFor="city">City
            <input type="text" name="city" defaultValue={this.state.city}/>
          </label>
          <label htmlFor="region">Region / State
            <input type="text" name="region" defaultValue={this.state.region}/>
          </label>
          <label htmlFor="country">Country
            <input type="text" name="country" defaultValue={this.state.country}/>
          </label>
          <label htmlFor="postalCode">Postal Code
            <input type="number" min="10000" max="99999" name="postalCode" defaultValue={this.state.postalCode}/>
          </label>
          <input type="submit"/>
        </form>
      </React.Fragment>
    );
  }
}