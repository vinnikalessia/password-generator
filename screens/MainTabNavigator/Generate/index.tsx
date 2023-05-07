// imports
import { View, Text, Pressable} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useState } from 'react'
import zxcvbn from 'zxcvbn'

// styles
import styles from '../../../styles/generate'

// components
import Strengthmeter from '../../../components/Strengthmeter'
import Clipboard from '../../../components/Clipboard'
import ParamPressable from '../../../components/ParamPressable';
import LengthSlider from '../../../components/LengthSlider';

export default () => {
  // states
  const [generatedPassword, setGeneratedPassword] = useState('output e.g. 8j3k4j')
  const [passwordStrength, setPasswordStrength] = useState<number>(0)
  
  // slider & textinput states
  const [sliderValue, setSliderValue] = useState<number>(4);
  const [passwordLength, setPasswordLength] = useState<string>('4')
  const [textInputValue, setTextInputValue] = useState('4');
  
  // include params states
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)

  // handlers params
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

  // handlers slider & textinput
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

  // generate password
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

  // generate random password
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


  return (
    <ScrollView style={styles.bg}>
      <View style={styles.container}>
        <Text style={styles.title}>Generate password</Text>
        <Text style={styles.subtitle}>Choose the parameters</Text>

        {/* output & clipboard */}
        <Clipboard generatedPassword={generatedPassword}/>

        {/* strengthmeter */}
        <Strengthmeter passwordStrength={passwordStrength}/>

        {/* params */}
        <View style={styles.paramContainer}>
          {/* slider & textinput */}
          <LengthSlider sliderValue={sliderValue} handleSliderChange={handleSliderChange} textInputValue={textInputValue} handleTextInputChange={handleTextInputChange} handleTextInputSubmit={handleTextInputSubmit}/>

          {/* pressables */}
          <ParamPressable include={includeUppercase} handleChange={handleIncludeUppercaseChange} context="uppercase"/>
          <ParamPressable include={includeLowercase} handleChange={handleIncludeLowercaseChange} context="lowercase"/>
          <ParamPressable include={includeSymbols} handleChange={handleIncludeSymbolsChange} context="symbols"/>
          <ParamPressable include={includeNumbers} handleChange={handleIncludeNumbersChange} context="numbers"/>

          {/* generate button */}
          <Pressable style={styles.generateButton} onPress={generatePassword}>
            <Text style={styles.generateText}>Generate</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  )
}
