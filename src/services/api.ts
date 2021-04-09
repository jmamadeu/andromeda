import axios from 'axios';

const TOKEN_GITHUB_API = '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';

const headers = {
  Authorization: 'bearer ' + TOKEN_GITHUB_API,
};

const api = axios.create({ headers, baseURL: 'https://api.github.com' });

export default api;
