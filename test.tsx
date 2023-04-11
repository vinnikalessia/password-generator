import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import zxcvbn from 'zxcvbn';

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  const handlePasswordLengthChange = (text) => {
    setPasswordLength(text);
  };

  const generatePassword = () => {
    const password = generateRandomPassword(parseInt(passwordLength));
    setGeneratedPassword(password);

    // Check password strength using zxcvbn
    const strength = zxcvbn(password).score;
    setPasswordStrength(strength);
  };

  const generateRandomPassword = (length) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={handlePasswordLengthChange}
        value={passwordLength}
        placeholder="Enter password length"
      />
      <Text style={styles.generatedPassword}>Generated Password: {generatedPassword}</Text>
      {passwordStrength !== '' && (
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
      <Text onPress={generatePassword} style={styles.generateButton}>
        Generate Password
      </Text>
    </View>
  );
};

const getPasswordStrengthLabel = (strength) => {
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

const getPasswordStrengthColor = (strength) => {
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
    padding: 16,
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
});

export default PasswordGenerator;
