import axios from 'axios';

export const APIClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: 4000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },

  transformRequest: [
    (postData, headers) => {
      if (headers?.['Content-Type'] === 'multipart/form-data') {
        delete (headers?.common as any)?.Authorization;
        return postData;
      }
      return JSON.stringify(postData);
    },
  ],
});
