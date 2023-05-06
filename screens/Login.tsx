import React, { useState, useEffect } from 'react'
import { View, Text, Alert, StyleSheet } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { useNavigation } from '@react-navigation/native'
import { MainTabNavigator } from './MainTabNavigator'
import styles from "../styles/login"


export default () => {
  const [qrData, setQrData] = useState<string | null>(null)
  const [scanningEnabled, setScanningEnabled] = useState(true)
  const navigation = useNavigation()

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanningEnabled) {
      setScanningEnabled(false)
      if (data === 'My_password_is_1234') {
        setQrData(data)
      } else {
        Alert.alert('Error', 'Incorrect QR code, please try again', [
          {
            text: 'OK',
            onPress: () => {
              setScanningEnabled(true)
            },
          },
        ])
      }
    }
  }

  useEffect(() => {
    return () => {
      setScanningEnabled(true)
    }
  }, [])

  if (qrData) {
    return <MainTabNavigator />
  } else {
    return (
      <View style={styles.generic}>
        <Text style={styles.header}>Scan the QR code</Text>
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={{ height: 200, width: 200 }}
        />
        <Text style={styles.text}>Scanning...</Text>
      </View>
    )
  }
}

