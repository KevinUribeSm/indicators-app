import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';
import IndicatorValueItem from './IndicatorValueItem';
import {useFetchIndicatorValues} from '../hooks/useIndicatorsValues';

const IndicatorLastNDaysComponent = ({
  indicatorName,
  days,
}: {
  indicatorName: string;
  days: number;
}) => {
  const {values, loading, error} = useFetchIndicatorValues(indicatorName, days);
  const nameLower = indicatorName.toLowerCase();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#0000ff"
          accessibilityLabel="Cargando indicadores"
        />
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Valores de {indicatorName}{' '}
        {nameLower === 'utm' || nameLower === 'ipc'
          ? '- Año actual'
          : `- Últimos ${days} días`}
      </Text>
      <FlatList
        data={values}
        keyExtractor={item => item.Fecha}
        renderItem={({item}) => (
          <IndicatorValueItem fecha={item.Fecha} valor={item.Valor} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  errorText: {
    color: 'red',
  },
});

export default IndicatorLastNDaysComponent;
