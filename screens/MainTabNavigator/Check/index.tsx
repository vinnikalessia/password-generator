// imports
import { useState } from 'react'
import { View, Text, Pressable} from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import zxcvbn from 'zxcvbn'

// styles
import styles from '../../../styles/check'
import Strengthmeter from '../../../components/Strengthmeter'

export default () => {
  const [password, setPassword] = useState<string>('')
  const [passwordStrength, setPasswordStrength] = useState<number>(0)

  const handlePassword = (text: string) => {
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

        {/* check button */}
        <TextInput
          keyboardType='default'
          placeholder='password'
          value={password}
          onChangeText={handlePassword}
          style={styles.input}
          onSubmitEditing={() => handleOkPress(password)}
          maxLength={50}
          />

        {/* strengthmeter */}
        <Strengthmeter passwordStrength={passwordStrength}/>

        {/* check button */}
        <Pressable style={styles.checkButton} onPress={checkingPassword}>
            <Text style={styles.checkText}>Check</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}



