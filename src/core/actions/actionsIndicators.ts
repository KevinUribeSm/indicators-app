import apiClient from '../api/apiClient';

export const getDolarCurrentValue = async () => {
  const response = await apiClient.get('/dolar');
  const values = response.data.Dolares[0];
  return values;
};

export const getEuroCurrentValue = async () => {
  const response = await apiClient.get('/euro');
  const value = response.data.Euros[0];
  return value;
};

export const getUFCurrentValue = async () => {
  const response = await apiClient.get('/uf');
  const value = response.data.UFs[0];
  return value;
};
