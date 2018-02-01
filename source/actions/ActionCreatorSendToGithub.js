// @flow
// Dispatcher
import AppDispatcher from '../dispatcher/AppDispatcher';
// Stores
import StoreAddress from '../stores/StoreAddress';
// Other libraries
import 'whatwg-fetch';

interface ActionObject {
  type: string,
  parameter: GithubObject
}

interface GithubObject {
  milestone: any,
  state: string,
  assignee: string,
  creator?: string,
  mentioned?: string,
  labels?: string,
  sort: string,
  since?: string
}

export default function(objectToSubmit : GithubObject): void {

  let route: string = 'api/v0/drones'

  let address = `${StoreAddress.getAddressRoot()}${route}`;
  let url = new URL(address),
    params = objectToSubmit;
  // Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  fetch(url, {method: 'GET'}).then((response) => {
    return response.json()
  }).then((array) => {

console.log('array: ', array);

    dispatchAction(array);
  }).catch((ex) => {
    console.error('parsing failed', ex);
    return false;
  });
}

function dispatchAction(parameter : GithubObject) {
  let Action: ActionObject = {
    type: 'update_github_array',
    parameter: parameter
  };
  AppDispatcher.dispatch(Action);
}
