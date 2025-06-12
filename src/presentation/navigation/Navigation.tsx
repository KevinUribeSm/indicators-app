import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import IndicatorDetailScreen from '../screens/IndicatorDetail';
import IndicatorDetailChart from '../screens/IndicatorDetailChart';

export type RootStackParamList = {
  Home: undefined;
  IndicatorDetail: {indicatorName: string};
  IndicatorDetailChart: {indicatorName: string; value: string};
};

const Stack = createStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="IndicatorDetail"
        component={IndicatorDetailScreen}
        options={({route}) => ({
          title: route.params.indicatorName.toUpperCase(),
        })}
      />
      <Stack.Screen
        name="IndicatorDetailChart"
        component={IndicatorDetailChart}
        options={({route}) => ({
          title: route.params.indicatorName.toUpperCase(),
        })}
      />
    </Stack.Navigator>
  );
};
