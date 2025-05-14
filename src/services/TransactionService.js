import axios from 'axios';

const REST_API_BASE_URL = 'https://saurabh55-dev.github.io/fintrack-backend-api/api/transactions';

export const listTransactions = () => axios.get(REST_API_BASE_URL);

export const getTransactionById = (id) => axios.get(`${REST_API_BASE_URL}/${id}`);

export const createTransaction = (categoryId, transaction) => axios.post(`${REST_API_BASE_URL}/category/${categoryId}/transaction`, transaction);

export const editTransaction = (id, transaction) => axios.put(`${REST_API_BASE_URL}/${id}`, transaction);

export const removeTransaction = (id) => axios.delete(`${REST_API_BASE_URL}/${id}`);

export const transactionSummary = () => axios.get(`${REST_API_BASE_URL}/summary`);

export const transactionSummaryByCategory = () => axios.get(`${REST_API_BASE_URL}/summary/category`);

export const transactionSummaryMonthly = () => axios.get(`${REST_API_BASE_URL}/summary/monthly`);


