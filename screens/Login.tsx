import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { LabStack } from './LabStack';

export default () => {
  const [qrData, setQrData] = useState<string | null>(null);
  const navigation = useNavigation();

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (data === 'My_password_is_1234') {
      setQrData(data);
      Alert.alert('Success', 'Login successful!');
    }
    else {
      Alert.alert('Error', 'Incorrect QR code, please try again');
      
      // styles.generic.backgroundColor = "#E76F51";
    }
  };

  if (qrData) {
    return <LabStack/>;
  }
  else{
    return(
      <View style={styles.generic}>
        <Text style={styles.header}>Scan the QR code</Text>
        <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={{ height: 200, width: 200 }}
        />
        <Text style={styles.text}>Scanning...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  generic:{
    flex: 1,
    backgroundColor: "#264653",
    alignItems: "center",
    justifyContent: "center",
  },

  header:{
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 20,
  },

  text:{
    marginTop: 20,
  }
})