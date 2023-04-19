import {
  ParamListBase,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useState } from 'react'
import { View, Text, Pressable, StyleSheet} from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import zxcvbn from 'zxcvbn'
import * as React from 'react';
import * as Clipboard from 'expo-clipboard';

export default () => {
  const { setOptions, goBack } =
    useNavigation<StackNavigationProp<ParamListBase, 'LabStack'>>()

    const [password, setPassword] = useState<string>('')
  const [checkPassword, setCheckPassword] = useState<string>('')
  const [passwordStrength, setPasswordStrength] = useState<number>(0)

  const checkingPassword = (text: any) => {
    console.log('checkPassword => ', checkPassword)
    console.log(checkPassword)
    setPassword(text)
  }

  return (
    <ScrollView style={styles.bg}>
      <View style={styles.container}>
        <Text style={styles.title}>Check here your password</Text>

        <TextInput
          keyboardType='default'
          placeholder='password'
          value={password}
          onChangeText={checkingPassword}
          style={styles.input}
          />

        <Text>{}</Text>

        <View>
          <Text style={styles.passwordStrength}>Password Strength:</Text>
          <View style={styles.strengthMeter}>
            <View style={[styles.strengthMeterBar]} />
          </View>
        </View>

        <Pressable style={styles.checkButton} onPress={checkingPassword}>
            <Text style={styles.checkText}>Check</Text>
          </Pressable>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F0F3',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#2A9D8F',
  },
  passwordStrength: {
    fontSize: 12,
    marginBottom: 4,
  },
  strengthMeter: {
    backgroundColor: 'gray',
    marginBottom: 24,
    width: 232,
    height: 4,
  },
  strengthMeterBar: {
    height: 4,
  },
  input: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 48,
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 5,
    margin: 24,
    width: '65%',
  },
  checkButton: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    width: '65%',
    height: 56,
    borderRadius: 5,
    margin: 8,
  },
  checkText: {
    fontSize: 18,
    color: '#2A9D8F',
  },
  bg:{
    backgroundColor: '#E8F0F3',
  },
})


