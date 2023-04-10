import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { LabStack } from './screens/LabStack';


export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Text>This is App.tsx</Text>
      <LabStack/>
    </NavigationContainer>
  );
}


