import axios from 'axios';

const REST_API_BASE_URL = 'https://saurabh55-dev.github.io/fintrack-backend-api/api/categories';

export const listCategories = () => axios.get(REST_API_BASE_URL);

export const getCategoryById = (categoryId) => axios.get(`${REST_API_BASE_URL}/${categoryId}`);

export const createCategory = (category) => axios.post(REST_API_BASE_URL, category);

export const editCategory = (categoryId, category) => axios.put(`${REST_API_BASE_URL}/${categoryId}`, category);

export const removeCategory = (categoryId) => axios.delete(`${REST_API_BASE_URL}/${categoryId}`);