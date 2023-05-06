import { ParamListBase, useFocusEffect, useNavigation, } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useState } from 'react'
import { View, Text, Pressable, StyleSheet} from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import zxcvbn from 'zxcvbn'
import * as React from 'react';

// styles
import strength from "../../../styles/strength"
import styles from '../../../styles/check'

export default () => {
  const [password, setPassword] = useState<string>('')
  const [passwordStrength, setPasswordStrength] = useState<number>(0)

  const handlePassword = (text: any) => {
    setPassword(text)
  }

  const checkingPassword = () => {
    const strength = zxcvbn(password).score
    setPasswordStrength(strength)
  }

  function handleOkPress(psw:string) {
    handlePassword(psw)
    checkingPassword()
  }

  return (
    <ScrollView style={styles.bg}>
      <View style={styles.container}>
        <Text style={styles.title}>Check here your password</Text>

        <TextInput
          keyboardType='default'
          placeholder='password'
          value={password}
          onChangeText={handlePassword}
          style={styles.input}
          onSubmitEditing={() => handleOkPress(password)}
          maxLength={50}
          />

        <View>
          <Text style={strength.passwordStrength}>
            Password Strength: {getPasswordStrengthLabel(passwordStrength)}
          </Text>
          <View style={strength.strengthMeter}>
            <View
              style={[
                strength.strengthMeterBar,
                { backgroundColor: getPasswordStrengthColor(passwordStrength) },
              ]}
            />
          </View>
        </View>

        <Pressable style={styles.checkButton} onPress={checkingPassword}>
            <Text style={styles.checkText}>Check</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

const getPasswordStrengthLabel = (strength: any) => {
  switch (strength) {
    case 0:
      return 'Weak'
    case 1:
      return 'Fair'
    case 2:
      return 'Moderate'
    case 3:
      return 'Strong'
    case 4:
      return 'Very Strong'
    default:
      return ''
  }
}

const getPasswordStrengthColor = (strength: any) => {
  switch (strength) {
    case 0:
      return 'red'
    case 1:
      return 'orange'
    case 2:
      return 'yellow'
    case 3:
      return 'green'
    case 4:
      return 'blue'
    default:
      return 'gray'
  }
}

