import superagent from 'superagent';

import * as utils from './utils.js';

let base = 'https://storefront-api.herokuapp.com/api/v1';

export const get = async payload => {
  let url = base + '/' + Object.values(payload).join('/');

  let data = await utils.fetchData(url);
  return data;
};

export const put = payload => {
  let url = `${base}/${payload.model}/${payload.data._id}`;
  return superagent
    .put(url)
    .send(payload.data)
    .then(result => result.body)
    .catch(console.error);
};
