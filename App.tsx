import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import WebAttendanceScreen from './screens/WebAttendanceScreen';
import SettingsScreen from './screens/SettingsScreen';
import RegisterScreen from './screens/RegisterScreen';

export type RootStackParamList = {
  Home: undefined;
  WebAttendance: { roomNumber: string };
  Settings: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: '出席一覧' }} />
        <Stack.Screen name="WebAttendance" component={WebAttendanceScreen} options={{ title: '出席中' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: '設定' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: '授業登録' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}