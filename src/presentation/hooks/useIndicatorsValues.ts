import {useEffect, useState} from 'react';
import {
  getIndicatorLastNDays,
  getIndicatorCurrentYearMonths,
} from '../../core/actions/actionsLast30days';

export type IndicatorValue = {
  Fecha: string;
  Valor: number | null;
};

export const useFetchIndicatorValues = (
  indicatorName: string,
  days: number,
) => {
  const [values, setValues] = useState<IndicatorValue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchValues = async () => {
      try {
        const nameLower = indicatorName.toLowerCase();
        let fetchedValues: IndicatorValue[];

        if (nameLower === 'utm' || nameLower === 'ipc') {
          fetchedValues = await getIndicatorCurrentYearMonths(indicatorName);
        } else {
          fetchedValues = await getIndicatorLastNDays(indicatorName, days);
        }

        setValues(fetchedValues ? fetchedValues.reverse() : []);
      } catch (err) {
        console.error(err);
        setError(`Error al obtener los valores de ${indicatorName}`);
      } finally {
        setLoading(false);
      }
    };

    fetchValues();
  }, [indicatorName, days]);

  return {values, loading, error};
};
