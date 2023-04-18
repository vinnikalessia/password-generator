import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types'
import { View, Text, Pressable, StyleSheet, Button } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { useState } from 'react'
import zxcvbn from 'zxcvbn'
import * as Clipboard from 'expo-clipboard';

type Option = 'lowercase' | 'uppercase' | 'symbols' | 'numbers'

export default () => {
  const { navigate } =
    useNavigation<StackNavigationProp<ParamListBase, 'LabStack'>>()
  // const [selectedOptions, setSelectedOptions] = useState<Option[]>([])

  const [passwordLength, setPasswordLength] = useState<string>('8')
  const [generatedPassword, setGeneratedPassword] = useState('')
  const [passwordStrength, setPasswordStrength] = useState<number>(0)

  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)

  const handlePasswordLengthChange = (text: any) => {
    setPasswordLength(text)
  }

  const handleIncludeUppercaseChange = (value: boolean) => {
    setIncludeUppercase(value)
  }

  const handleIncludeLowercaseChange = (value: boolean) => {
    setIncludeLowercase(value)
  }

  const handleIncludeNumbersChange = (value: boolean) => {
    setIncludeNumbers(value)
  }

  const handleIncludeSymbolsChange = (value: boolean) => {
    setIncludeSymbols(value)
  }

  const generatePassword = () => {
    const password = generateRandomPassword(
      parseInt(passwordLength),
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols,
    )
    setGeneratedPassword(password)
    // console.log('generatedPassword in generatePassword => ', password)
    

    // Check password strength using zxcvbn
    const strength = zxcvbn(password).score
    setPasswordStrength(strength)
  }

  const generateRandomPassword = (
    length: any,
    uppercase: any,
    lowercase: any,
    numbers: any,
    symbols: any,
  ) => {
    let chars = ''
    if (uppercase) {
      chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    }
    if (lowercase) {
      chars += 'abcdefghijklmnopqrstuvwxyz'
    }
    if (numbers) {
      chars += '0123456789'
    }
    if (symbols) {
      chars += '#$%^&_-+'
    }

    let password = ''
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
  }

  const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(generatedPassword);
  };

  return (
    <ScrollView style={styles.bg}>
      <View style={styles.container}>
        <Text style={styles.title}>Generate password</Text>
        <Text style={styles.subtitle}>Choose the parameters</Text>

        <View style={styles.copy}>
          <Text style={styles.output}>{generatedPassword}</Text>
          <Pressable onPress={copyToClipboard}>
            <Ionicons name="clipboard-outline" style={styles.copyIcon} size={23} />
          </Pressable>
        </View>

        <View>
          <Text style={styles.passwordStrength}>
            Password Strength: {getPasswordStrengthLabel(passwordStrength)}
          </Text>
          <View style={styles.strengthMeter}>
            <View
              style={[
                styles.strengthMeterBar,
                { backgroundColor: getPasswordStrengthColor(passwordStrength) },
              ]}
            />
          </View>
        </View>
        

        <View style={styles.paramContainer}>
          <TextInput
            keyboardType="numeric"
            placeholder="length: 8"
            onChangeText={handlePasswordLengthChange}
            value={passwordLength}
            style={styles.bigGridItem}
          />

          <Pressable
            style={[
              styles.gridItem,
              includeUppercase ? styles.selectedButton : styles.gridItem,
            ]}
            onPress={() => handleIncludeUppercaseChange(!includeUppercase)}
          >
            <Text>A</Text>
          </Pressable>

          <Pressable
            style={[
              styles.gridItem,
              includeLowercase ? styles.selectedButton : styles.gridItem,
            ]}
            onPress={() => handleIncludeLowercaseChange(!includeLowercase)}
          >
            <Text>a</Text>
          </Pressable>

          <Pressable
            style={[
              styles.gridItem,
              includeSymbols ? styles.selectedButton : styles.gridItem,
            ]}
            onPress={() => handleIncludeSymbolsChange(!includeSymbols)}
          >
            <Text>&!</Text>
          </Pressable>

          <Pressable
            style={[
              styles.gridItem,
              includeNumbers ? styles.selectedButton : styles.gridItem,
            ]}
            onPress={() => handleIncludeNumbersChange(!includeNumbers)}
          >
            <Text>123</Text>
          </Pressable>

          <Pressable style={styles.generateButton} onPress={generatePassword}>
            <Text style={styles.generateText}>Generate</Text>
          </Pressable>
        </View>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigate('Check')
          }}
        >
          <Text style={styles.buttonText}>check your password here</Text>
          <Ionicons
            name="arrow-forward-outline"
            style={styles.icon}
            size={23}
          />
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

const styles = StyleSheet.create({
  bg:{
    backgroundColor: '#E8F0F3',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#2A9D8F',
  },
  subtitle: {
    fontSize: 14,
    color: '#2A9D8F',
  },
  passwordStrength: {
    fontSize: 12,
    marginBottom: 4,
  },
  strengthMeter: {
    backgroundColor: 'gray',
    marginBottom: 8,
    width: 210,
    height: 4,
  },
  strengthMeterBar: {
    height: 4,
  },
  paramContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    height: 96,
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 5,
    margin: 8,
  },
  bigGridItem: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '65%',
    height: 48,
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 5,
    margin: 8,
  },
  selectedButton: {
    backgroundColor: '#D4EBE9',
    borderWidth: 2,
    borderColor: '#2A9D8F',
  },
  generateButton: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    width: '65%',
    height: 56,
    borderRadius: 5,
    margin: 8,
  },
  generateText: {
    fontSize: 18,
    color: '#2A9D8F',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    padding: 16,
    marginBottom: 16,
    marginTop: 32,
    width: 230,
  },
  buttonText: {
    fontSize: 14,
    color: '#2A9D8F',
  },
  icon: {
    color: '#2A9D8F',
  },
  output: {
    fontSize: 12,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 6,
    width: 210,
  },
  copy: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  copyIcon: {
    color: '#2A9D8F',
    paddingLeft: 8,
  }
})
