import * as React from 'react';

interface IAddressProps { 
  address: { 
    address1: string, 
    address2: string, 
    city: string, 
    state: string, 
    zip: string,
  }
}

const Address: React.FunctionComponent<IAddressProps> = ({ address: { address1, address2, city, state, zip } }) => {
  return (
    <address>
      { address1 } {address2 ? `, ${address2}` : null }<br/>
      { city }, { state } { zip }
    </address>
  );
};

export default Address;