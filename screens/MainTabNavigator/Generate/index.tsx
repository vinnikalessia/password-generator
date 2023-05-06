import { View, Text, Pressable, StyleSheet, TextInput} from 'react-native'
import Slider from '@react-native-community/slider';
import Ionicons from '@expo/vector-icons/Ionicons'
import { ScrollView } from 'react-native-gesture-handler'
import { useState } from 'react'
import zxcvbn from 'zxcvbn'
import * as Clipboard from 'expo-clipboard';
import { NotificationFeedbackType, notificationAsync } from 'expo-haptics'

export default () => {
  const [passwordLength, setPasswordLength] = useState<string>('4')
  const [generatedPassword, setGeneratedPassword] = useState('output e.g. 8j3k4j')
  const [passwordStrength, setPasswordStrength] = useState<number>(0)
  const [textInputValue, setTextInputValue] = useState('4');
  
  const [sliderValue, setSliderValue] = useState<number>(4);

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

  const copyToClipboard = async () => {
    notificationAsync(NotificationFeedbackType.Success)
    console.log('copied to clipboard')
    await Clipboard.setStringAsync(generatedPassword);
  };

  
  const handleSliderChange = (value: any) => {
    handlePasswordLengthChange(value);
    setSliderValue(value);
    setTextInputValue(String(value));
  };

  const handleTextInputChange = (value: string) => {
    const numericValue = parseInt(value);
    if (isNaN(numericValue)) {
      setTextInputValue(value);
      return;
    }
    setTextInputValue(value);
  };
  

  const handleTextInputSubmit = () => {
    const numericValue = parseInt(textInputValue);
    if (isNaN(numericValue)) {
      return;
    }
    const constrainedValue = Math.max(4, Math.min(numericValue, 50));
    setSliderValue(constrainedValue);
    handlePasswordLengthChange(constrainedValue);
    setTextInputValue(String(constrainedValue));
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
        <Slider
            style={styles.slider}
            minimumValue={4}
            maximumValue={50}
            step={1}
            value={sliderValue}
            onValueChange={handleSliderChange}
            minimumTrackTintColor="#2A9D8F"
            maximumTrackTintColor="#2A9D8F"
            thumbTintColor="#2A9D8F"
            tapToSeek={true}
          />
          <TextInput
            keyboardType="numeric"
            value={textInputValue}
            onChangeText={handleTextInputChange}
            onSubmitEditing={handleTextInputSubmit}
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
  // basic styles
  bg:{
    backgroundColor: '#E8F0F3',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 48,
  },

  // title styles
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

  // generated password and copy
  copy: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  output: {
    fontSize: 12,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 6,
    width: 210,
  },
  copyIcon: {
    color: '#2A9D8F',
    paddingLeft: 8,
  },

  // password strength
  passwordStrength: {
    fontSize: 12,
    marginBottom: 4,
  },
  strengthMeter: {
    backgroundColor: 'gray',
    marginBottom: 4,
    width: 230,
    height: 4,
  },
  strengthMeterBar: {
    height: 4,
  },

  // parameters for generating password
  paramContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    width: 235,
  },
  slider:{
    width: 165,
    height: 40,
    color: '#2A9D8F',
    marginLeft: -30,
  },
  gridItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '46%',
    height: 96,
    backgroundColor: '#FFF',
    borderRadius: 5,
    margin: 4,
  },
  selectedButton: {
    backgroundColor: '#D4EBE9',
    borderWidth: 2,
    borderColor: '#2A9D8F',
  },

  // button to generate password
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
})
