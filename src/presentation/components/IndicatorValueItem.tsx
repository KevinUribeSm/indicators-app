import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props {
  fecha: string;
  valor: number | null;
}

const IndicatorValueItem = ({fecha, valor}: Props) => {
  return (
    <View style={styles.item}>
      <Text style={styles.dateText}>Fecha: {fecha}</Text>
      <Text style={styles.valueText}>Valor: ${valor ?? '-'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dateText: {
    fontSize: 16,
  },
  valueText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5a9ded',
  },
});

export default IndicatorValueItem;
