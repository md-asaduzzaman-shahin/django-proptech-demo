import axios from 'axios';

// NOTE: We are using LOCAL Django server for development.

const API_URL = 'http://127.0.0.1:8000/api/properties/';

export const fetchProperties = () => axios.get(API_URL);
export const createProperty = (data) => axios.post(API_URL, data);