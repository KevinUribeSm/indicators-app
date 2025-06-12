import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/Navigation';
import {LineChart} from 'react-native-chart-kit';
import {
  getIndicatorLastNDays,
  getIndicatorLast12Months,
} from '../../core/actions/actionsLast30days';

type IndicatorDetailRouteProp = RouteProp<
  RootStackParamList,
  'IndicatorDetailChart'
>;

type Props = {
  route: IndicatorDetailRouteProp;
};

const IndicatorDetailChart = ({route}: Props) => {
  const {indicatorName, value} = route.params;
  const [values, setValues] = useState<{Fecha: string; Valor: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const firstDate = values[0]?.Fecha.slice(0, 10);
  const lastDate = values[values.length - 1]?.Fecha.slice(0, 10);

  useEffect(() => {
    const fetchValues = async () => {
      try {
        let result;
        if (
          indicatorName.toLowerCase() === 'utm' ||
          indicatorName.toLowerCase() === 'ipc'
        ) {
          result = await getIndicatorLast12Months(indicatorName);
        } else {
          result = await getIndicatorLastNDays(indicatorName, 10);
        }
        setValues(result ? result.reverse() : []);
      } catch (err) {
        console.error(err);
        setError(`Error al obtener los valores de ${indicatorName}`);
      } finally {
        setLoading(false);
      }
    };

    fetchValues();
  }, [indicatorName]);

  const chartData = {
    labels: values.map(item =>
      indicatorName.toLowerCase() === 'utm' ||
      indicatorName.toLowerCase() === 'ipc'
        ? item.Fecha.slice(5, 7)
        : item.Fecha.slice(8, 10),
    ),
    datasets: [
      {
        data: values.map(item => parseFloat(item.Valor.replace(',', '.'))),
      },
    ],
  };

  const screenWidth = Dimensions.get('window').width;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando valores de {indicatorName}...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const isMonthly =
    indicatorName.toLowerCase() === 'utm' ||
    indicatorName.toLowerCase() === 'ipc';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isMonthly ? ' Año actual' : 'Últimos 10 días'}
      </Text>

      <Text style={styles.subtitle}>
        Valor actual: {value ? value : 'No disponible'}
      </Text>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.subtitle}>Desde: {lastDate}</Text>
        <Text style={styles.subtitle}>Hasta: {firstDate}</Text>
      </View>

      <LineChart
        data={chartData}
        width={screenWidth - 32}
        height={300}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(34, 128, 176, ${opacity})`,
          labelColor: () => '#333',
          style: {borderRadius: 8},
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: '#22a0b0',
          },
        }}
        bezier
        style={{borderRadius: 8}}
        fromZero
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    backgroundColor: 'white',
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    borderRadius: 16,
    textAlign: 'center',
    fontWeight: '800',
    color: '#5a9ded',
  },
  errorText: {
    color: 'red',
  },
});

export default IndicatorDetailChart;
