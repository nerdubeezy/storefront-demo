import Avatax from 'avatax';
import superagent from 'superagent';

const config = {
  appName: 'avatax-demo',
  appVersion: '1.0',
  environment: 'production',
  machineName: 'justin\'s-machine',
};

const creds = {
  username: 'justinjodymorris@gmail.com',
  password: 'Abcdefghi5',
};

var client = new Avatax(config).withSecurity(creds);

export const post = (taxDocument) => {
  console.log('tax', taxDocument);
  return client.createTransaction({ model: taxDocument })
    .then(result => {
      // response tax document
      return result;
    })
    .catch(err => console.log(err.details[0].message));
};

export const resolveAddress = (address) => {

  const baseURI = 'https://rest.avatax.com/api/v2/addresses/resolve';

  let queryString = Object.keys(address).map(key => {
    return `${key}=${encodeURIComponent(address[key])}`; 
  }).join('&').concat('&textCase=Upper');

  let apiUrl = `${baseURI}?${queryString}`;

  return superagent.get(apiUrl)
    .auth(creds.username, creds.password)
    .set('Content-Type', 'application/json')
    .then(res => {
      return res.body;
    })
    .catch(err => {
      console.log(err);
      return 'There was an error resolving the Address';
    });
};