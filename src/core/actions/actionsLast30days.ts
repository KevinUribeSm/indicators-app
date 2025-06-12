import dayjs from 'dayjs';
import apiClient from '../api/apiClient';

const indicatorConfig: Record<
  string,
  {endpoint: string; responseField: string}
> = {
  dolar: {endpoint: 'dolar', responseField: 'Dolares'},
  euro: {endpoint: 'euro', responseField: 'Euros'},
  uf: {endpoint: 'uf', responseField: 'UFs'},
  utm: {endpoint: 'utm', responseField: 'UTMs'},
  ipc: {endpoint: 'ipc', responseField: 'IPCs'},
};

export const getIndicatorLastNDays = async (
  indicatorName: string,
  days: number,
) => {
  const config = indicatorConfig[indicatorName.toLowerCase()];
  if (!config) {
    throw new Error(`Indicador no soportado: ${indicatorName}`);
  }

  const today = dayjs();
  const startDate = today.subtract(days, 'day');

  const url =
    `/${config.endpoint}/periodo/${startDate.year()}/${String(
      startDate.month() + 1,
    ).padStart(2, '0')}/dias_i/${String(startDate.date()).padStart(2, '0')}` +
    `/${today.year()}/${String(today.month() + 1).padStart(
      2,
      '0',
    )}/dias_f/${String(today.date()).padStart(2, '0')}`;

  const response = await apiClient.get(url);
  const values = response.data[config.responseField];

  return values.map((item: any) => ({
    Fecha: item.Fecha,
    Valor: item.Valor,
  }));
};

export const getIndicatorCurrentYearMonths = async (indicatorName: string) => {
  const config = indicatorConfig[indicatorName.toLowerCase()];
  if (!config) {
    throw new Error(`Indicador no soportado: ${indicatorName}`);
  }

  const today = dayjs();
  const currentYear = today.year();

  let url = '';

  if (
    indicatorName.toLowerCase() === 'ipc' ||
    indicatorName.toLowerCase() === 'utm'
  ) {
    url = `/${config.endpoint}/${currentYear}`;
  }

  const response = await apiClient.get(url);

  const values = response.data[config.responseField];

  return values.map((item: any) => ({
    Fecha: item.Fecha,
    Valor: item.Valor,
  }));
};

export const getIndicatorLast12Months = async (indicatorName: string) => {
  const config = indicatorConfig[indicatorName.toLowerCase()];
  if (!config) {
    throw new Error(`Indicador no soportado: ${indicatorName}`);
  }

  const today = dayjs();
  const startDate = today.subtract(12, 'month');

  const startYear = startDate.year();
  const startMonth = String(startDate.month() + 1).padStart(2, '0');
  const endYear = today.year();
  const endMonth = String(today.month() + 1).padStart(2, '0');

  const url = `/${config.endpoint}/periodo/${startYear}/${startMonth}/${endYear}/${endMonth}`;

  const response = await apiClient.get(url);

  const values = response.data[config.responseField];

  return values.map((item: any) => ({
    Fecha: item.Fecha,
    Valor: item.Valor,
  }));
};
