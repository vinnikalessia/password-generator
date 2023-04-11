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

  const handlePasswordLengthChange = (text: any) => {
    setPasswordLength(text);
  };

  const generatePassword = () => {
    const password = generateRandomPassword(parseInt(passwordLength));
    setGeneratedPassword(password);

    // Check password strength using zxcvbn
    const strength = zxcvbn(password).score;
    setPasswordStrength(strength);
  };

  const generateRandomPassword = (length: any) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=';
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

      <Text style={styles.generatedPassword}>Generated Password: {generatedPassword}</Text>
      {passwordStrength !== 0 && (
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
      )}

      <View style={styles.paramContainer}>
        <TextInput
          keyboardType="numeric"
          style={[styles.gridItem, styles.bigGridItem]}
          placeholder="length"
          onChangeText={handlePasswordLengthChange}
          value={passwordLength}
        />

        <Pressable
          style={[
            styles.gridItem,
            isOptionSelected('uppercase') && styles.selectedButton,
          ]}
          onPress={() => handleOptionPress('uppercase')}
        >
          <Text style={styles.gridItemText}>A</Text>
        </Pressable>

        <Pressable
          style={[
            styles.gridItem,
            isOptionSelected('lowercase') && styles.selectedButton,
          ]}
          onPress={() => handleOptionPress('lowercase')}
        >
          <Text style={styles.gridItemText}>a</Text>
        </Pressable>

        <Pressable
          style={[
            styles.gridItem,
            isOptionSelected('symbols') && styles.selectedButton,
          ]}
          onPress={() => handleOptionPress('symbols')}
        >
          <Text style={styles.gridItemText}>&!</Text>
        </Pressable>

        <Pressable
          style={[
            styles.gridItem,
            isOptionSelected('numbers') && styles.selectedButton,
          ]}
          onPress={() => handleOptionPress('numbers')}
        >
          <Text style={styles.gridItemText}>123</Text>
        </Pressable>

        <Pressable
          style={[styles.generate]}
          onPress={generatePassword}
        >
          <Text style={styles.buttontext}>generate</Text>
        </Pressable>
      </View>
      

      <Pressable
        onPress={() => {
          navigate('Check')
        }}
        style={styles.button}
      >
        <Text style={styles.buttontext}>check your password here</Text>
        <Ionicons name="arrow-forward-outline" size={23} color="#2A9D8F" />
      </Pressable>
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
    fontSize: 18,
    marginTop: 8,
    color: '#2A9D8F',
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttontext: {
    color: '#2A9D8F',
    fontSize: 16,
    margin: 6,
  },
  paramContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItem: {
    width: '30%',
    height: 96,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 5,
    margin: 8,
  },
  bigGridItem: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '65%',
    height: 56,
    backgroundColor: '#FFF',
  },
  gridItemText: {
    fontSize: 18,
  },
  selectedButton: {
    backgroundColor: '#D4EBE9',
    borderWidth: 2,
    borderColor: '#2A9D8F',
  },
  generate: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    width: '65%',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },


  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  generatedPassword: {
    marginBottom: 16,
  },
  passwordStrength: {
    fontSize: 16,
    marginBottom: 8,
  },
  strengthMeter: {
    height: 10,
    backgroundColor: 'gray',
    marginBottom: 16,
  },
  strengthMeterBar: {
    height: 10,
  },
  generateButton: {
    fontSize: 16,
    color: 'blue',
  },
})





