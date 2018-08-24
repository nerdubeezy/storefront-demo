import React from 'react';

export default class Form extends React.Component {

  render() {
    return (
      <form>
        <label htmlFor="street">Street</label>
        <input type="text" name="street" />
        <label htmlFor="city">City</label>
        <input type="text" name="city"/>
        <label htmlFor="region">Region / State</label>
        <input type="text" name="region"/>
        <label htmlFor="country">Country</label>
        <input type="text" name="country" />
        <label htmlFor="postalCode">Postal Code / Zipcode</label>
        <input type="number" name="postalCode"/>
      </form>
    );
  }
}