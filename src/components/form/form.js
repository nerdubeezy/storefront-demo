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
      <React.Fragment>
        <h3 className="form-title">Shipping Address:</h3>
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
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