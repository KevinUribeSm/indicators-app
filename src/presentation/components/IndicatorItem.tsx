import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  onChartPress: () => void;
}

const IndicatorItem = ({title, onPress, onChartPress}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.row}>
        <Text style={styles.indicator}>{title.toUpperCase()}</Text>
        <TouchableOpacity onPress={onChartPress} style={styles.iconButton}>
          <Text style={styles.title}>Gráfica</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  indicator: {
    color: '#000000',
    fontSize: 20,
  },
  title: {
    color: '#5a9ded',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 8,
  },
});

export default IndicatorItem;
