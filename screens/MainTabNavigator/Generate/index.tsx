import { View, Text, Pressable, StyleSheet, TextInput} from 'react-native'
import Slider from '@react-native-community/slider';
import Ionicons from '@expo/vector-icons/Ionicons'
import { ScrollView } from 'react-native-gesture-handler'
import { useState } from 'react'
import zxcvbn from 'zxcvbn'
import * as Clipboard from 'expo-clipboard';
import { NotificationFeedbackType, notificationAsync } from 'expo-haptics'

// styles
import strength from "../../../styles/strength"
import styles from '../../../styles/generate'

// components
import Strengthmeter from '../../../components/Strengthmeter'

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

        {/* output & clipboard */}
        <View style={styles.copy}>
          <Text style={styles.output}>{generatedPassword}</Text>
          <Pressable onPress={copyToClipboard}>
            <Ionicons name="clipboard-outline" style={styles.copyIcon} size={23} />
          </Pressable>
        </View>

        {/* strengthmeter */}
        <Strengthmeter passwordStrength={passwordStrength}/>

        {/* slider & textinput & params */}
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

          {/* generate button */}
          <Pressable style={styles.generateButton} onPress={generatePassword}>
            <Text style={styles.generateText}>Generate</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  )
}
