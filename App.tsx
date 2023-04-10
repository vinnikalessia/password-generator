import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { LabStack } from './screens/LabStack';
import Login from './screens/Login';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Login/>
    </NavigationContainer>
  );
}


