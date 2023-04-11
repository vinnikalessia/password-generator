import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { TextInput } from 'react-native-gesture-handler'
import { useState } from 'react'
import zxcvbn from 'zxcvbn';


type Option = 'lowercase' | 'uppercase' | 'symbols' | 'numbers'

export default () => {
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase, 'LabStack'>>()
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([])

  const [passwordLength, setPasswordLength] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const handlePasswordLengthChange = (text: any) => {
    setPasswordLength(text);
  };

  const handleIncludeUppercaseChange = (value: boolean) => {
    setIncludeUppercase(value);
  };

  const handleIncludeLowercaseChange = (value: boolean) => {
    setIncludeLowercase(value);
  };

  const handleIncludeNumbersChange = (value: boolean) => {
    setIncludeNumbers(value);
  };

  const handleIncludeSymbolsChange = (value: boolean) => {
    setIncludeSymbols(value);
  };

  const generatePassword = () => {
    const password = generateRandomPassword(
      parseInt(passwordLength),
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols
    );
    setGeneratedPassword(password);

    // Check password strength using zxcvbn
    const strength = zxcvbn(password).score;
    setPasswordStrength(strength);
  };

  const generateRandomPassword = (length: any, uppercase: any, lowercase: any, numbers: any, symbols: any) => {
    let chars = '';
    if (uppercase) {
      chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (lowercase) {
      chars += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (numbers) {
      chars += '0123456789';
    }
    if (symbols) {
      chars += '!@#$%^&*()_-+=';
    }

    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleOptionPress = (option: Option) => {
    const index = selectedOptions.indexOf(option)
    if (index !== -1) {
      setSelectedOptions(prevOptions => [
        ...prevOptions.slice(0, index),
        ...prevOptions.slice(index + 1),
      ])
    } else {
      setSelectedOptions(prevOptions => [...prevOptions, option])
    }
  }

  const isOptionSelected = (option: Option) => {
    // Check if the option is selected
    return selectedOptions.indexOf(option) !== -1
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generate password</Text>
      <Text style={styles.subtitle}>Choose the parameters</Text>

      <Text style={styles.output}>Generated Password: {generatedPassword}</Text>
        <View>
          <Text style={styles.passwordStrength}>
            Password Strength: {getPasswordStrengthLabel(passwordStrength)}
          </Text>
          <View style={styles.strengthMeter}>
            <View
            style={[styles.strengthMeterBar, { backgroundColor: getPasswordStrengthColor(passwordStrength) }]}
            />
        </View>
      </View>
        <Pressable
        style={styles.button}
          onPress={() => {
            navigate('Check')
          }}
        >
          <Text style={styles.buttonText}>check your password here</Text>
          <Ionicons name="arrow-forward-outline"  style={styles.icon} size={23}/>
        </Pressable>

      <View style={styles.paramContainer}>
        <TextInput
          keyboardType="numeric"
          placeholder="length"
          onChangeText={handlePasswordLengthChange}
          value={passwordLength}
          style={styles.bigGridItem}
        />

        <Pressable
        style={styles.gridItem}
          onPress={() => handleIncludeUppercaseChange(!includeUppercase)}
        >
          <Text>{includeUppercase ? '✅' : '❌'}A</Text>
        </Pressable>

        <Pressable
        style={styles.gridItem}
          onPress={() => handleIncludeLowercaseChange(!includeLowercase)}
        >
          <Text>{includeLowercase ? '✅' : '❌'}a</Text>
        </Pressable>

        <Pressable
        style={styles.gridItem}
          onPress={() => handleIncludeSymbolsChange(!includeSymbols)}
        >
          <Text>{includeSymbols ? '✅' : '❌'}&!</Text>
        </Pressable>

        <Pressable
        style={styles.gridItem}
          onPress={() => handleIncludeNumbersChange(!includeNumbers)}
        >
          <Text>{includeNumbers ? '✅' : '❌'}123</Text>
        </Pressable>

        <Pressable
        style={styles.generateButton}
          onPress={generatePassword}
        >
          <Text style={styles.generateText}>Generate</Text>
        </Pressable>


      </View>
      
    </View>
  )
}

const getPasswordStrengthLabel = (strength: any) => {
  switch (strength) {
    case 0:
      return 'Weak';
    case 1:
      return 'Fair';
    case 2:
      return 'Moderate';
    case 3:
      return 'Strong';
    case 4:
      return 'Very Strong';
    default:
      return '';
  }
};

const getPasswordStrengthColor = (strength: any) => {
  switch (strength) {
    case 0:
      return 'red';
    case 1:
      return 'orange';
    case 2:
      return 'yellow';
    case 3:
      return 'green';
    case 4:
      return 'blue';
    default:
      return 'gray';
  }
};

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
  subtitle: {
    fontSize: 16,
    color: '#2A9D8F',
  },
  output: {
    fontSize: 12,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 6,
    marginVertical: 16,
  },
  passwordStrength: {
    fontSize: 12,
    marginBottom: 4,
  },
  strengthMeter: {
    backgroundColor: 'gray',
    marginBottom: 16,
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
    height: 56,
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 5,
    margin: 8,
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
  generateText:{
    fontSize: 18,
    color: '#2A9D8F',
  },
  button:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 16,
    marginBottom: 16,
  },
  buttonText:{
    fontSize: 14,
  },
  icon:{
    color: '#2A9D8F',
  }
})




