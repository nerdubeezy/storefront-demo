import Avatax from 'avatax';

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
  return client.createTransaction({ model: taxDocument })
    .then(result => {
      // response tax document
      return result;
    })
    .catch(err => console.log(err.details[0].message));
};