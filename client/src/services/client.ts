import { Http2ServerRequest } from "http2";

const axios = require('axios');
const client = axios.create();
client.defaults.baseURL = 'http://localhost:3000/api';

type Method = 'get' | 'put' | 'post' | 'delete';


export function request(method: Method = 'get', url: string, data?: any, params = {}, options = {}): any {
  Object.assign(params, client.defaults.params);

  const mergedOptions = Object.assign({method, url, data, params}, options);
  const requestPromise = client(mergedOptions);
  requestPromise.catch((err: Error) => {
    // const error = err.response && err.response.data.error;
    return err;
  });
  return requestPromise.then((res: any) => {
    return res.data;
  });
}

export function requestDownload(url: string, options = {}) {
    return request('get', url, undefined, undefined, {responseType: 'blob'}).then((res: any) => {
      const blobUrl = window.URL.createObjectURL(new Blob([res], options));
      return blobUrl; 
    });
  }