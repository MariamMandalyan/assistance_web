import axios from 'axios';

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_KEY,
  responseType: 'json',
});

export const CHATAPI = axios.create({
  baseURL: process.env.REACT_APP_CHAT_KEY,
  responseType: 'json',
});