import {useEffect, useState} from 'react';
import {
  getDolarCurrentValue,
  getEuroCurrentValue,
  getUFCurrentValue,
} from '../../core/actions/actionsIndicators';
import {getIndicatorCurrentYearMonths} from '../../core/actions/actionsLast30days';

export const useIndicators = () => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllIndicators = async () => {
      setLoading(true);
      setError(null);

      try {
        const [dolarData, euroData, ufData, utmData, ipcData] =
          await Promise.all([
            getDolarCurrentValue(),
            getEuroCurrentValue(),
            getUFCurrentValue(),
            getIndicatorCurrentYearMonths('utm'),
            getIndicatorCurrentYearMonths('ipc'),
          ]);

        setData({
          dolar: dolarData,
          euro: euroData,
          uf: ufData,
          utm: utmData,
          ipc: ipcData,
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllIndicators();
  }, []);

  return {data, loading, error};
};
