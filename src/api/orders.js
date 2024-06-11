import axios from 'axios';

const API_URL = '/api/orders';

export const fetchOrders = () => axios.get(API_URL);

export const deleteOrder = (orderId) => axios.delete(`${API_URL}/${orderId}`);

export const updateOrder = (order) => axios.put(`${API_URL}/${order.id}`, order);