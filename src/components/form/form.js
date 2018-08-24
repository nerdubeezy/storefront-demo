import React from 'react';

export default class Form extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      line1: '11922 59th Ave E',
      city: 'Puyallup',
      region: 'WA',
      country: 'US',
      postalCode: 98373,
    };
  }

  // componentDidUpdate() {
  //   console.log('__FORM_STATE__', this.state);
  // }

  handleChange = e => {
    let name = e.target.name;
    let value = e.target.value || '';
    this.setState({[name]: value});
  }

  handleSubmit = e => {
    e.preventDefault();
    let address = Object.assign({}, this.state);
    if (this.props.handler) { this.props.handler(address); }
    if (this.props.toggle) { this.props.toggle(); }
  }

  render() {
    return (
      <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
        <label htmlFor="line1">Street</label>
        <input type="text" name="line1" defaultValue={this.state.line1}/>
        <label htmlFor="city">City</label>
        <input type="text" name="city" defaultValue={this.state.city}/>
        <label htmlFor="region">Region / State</label>
        <input type="text" name="region" defaultValue={this.state.region}/>
        <label htmlFor="country">Country</label>
        <input type="text" name="country" defaultValue={this.state.country}/>
        <label htmlFor="postalCode">Postal Code / Zipcode</label>
        <input type="number" min="10000" max="99999" name="postalCode" defaultValue={this.state.postalCode}/>
        <input type="submit"/>
      </form>
    );
  }
}