import React from 'react';
import {View, Text, ActivityIndicator, FlatList} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/Navigation';
import {useIndicators} from '../hooks/useIndicators';
import IndicatorItem from '../components/IndicatorItem';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {data, loading, error} = useIndicators();

  const handlePress = (indicatorName: string) => {
    navigation.navigate('IndicatorDetail', {indicatorName});
  };

  const handleChart = (indicatorName: string) => {
    const indicatorData = data[indicatorName];

    let valueToSend: string | undefined = undefined;

    if (Array.isArray(indicatorData) && indicatorData.length > 0) {
      valueToSend = indicatorData[0].Valor;
    } else if (indicatorData && typeof indicatorData === 'object') {
      valueToSend = indicatorData.Valor;
    }

    navigation.navigate('IndicatorDetailChart', {
      indicatorName,
      value: valueToSend ?? 'No disponible',
    });
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={Object.keys(data)}
      keyExtractor={item => item}
      renderItem={({item}) => (
        <IndicatorItem
          title={item}
          onPress={() => handlePress(item)}
          onChartPress={() => handleChart(item)}
        />
      )}
    />
  );
};

export default Home;
