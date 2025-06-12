import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/Navigation';
import IndicatorLastNDaysComponent from '../components/IndicatorLastNDaysComponent.tsx';

type IndicatorDetailRouteProp = RouteProp<
  RootStackParamList,
  'IndicatorDetail'
>;

type Props = {
  route: IndicatorDetailRouteProp;
};

const IndicatorDetail = ({route}: Props) => {
  const {indicatorName} = route.params;

  return (
    <View style={styles.container}>
      <IndicatorLastNDaysComponent indicatorName={indicatorName} days={30} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default IndicatorDetail;
