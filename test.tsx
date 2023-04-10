
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

type Option = 'lowercase' | 'uppercase' | 'symbols' | 'numbers';

const MyComponent = () => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const handleOptionPress = (option: Option) => {
    // Check if the option is already selected
    const index = selectedOptions.indexOf(option);
    if (index !== -1) {
      // If already selected, remove it from the array
      setSelectedOptions((prevOptions) => [
        ...prevOptions.slice(0, index),
        ...prevOptions.slice(index + 1),
      ]);
    } else {
      // If not selected, add it to the array
      setSelectedOptions((prevOptions) => [...prevOptions, option]);
    }
  };

  const isOptionSelected = (option: Option) => {
    // Check if the option is selected
    return selectedOptions.indexOf(option) !== -1;
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.button,
          isOptionSelected('lowercase') && styles.selectedButton,
        ]}
        onPress={() => handleOptionPress('lowercase')}
      >
        <Text style={styles.buttonText}>Lowercase</Text>
      </Pressable>
      <Pressable
        style={[
          styles.button,
          isOptionSelected('uppercase') && styles.selectedButton,
        ]}
        onPress={() => handleOptionPress('uppercase')}
      >
        <Text style={styles.buttonText}>Uppercase</Text>
      </Pressable>
      <Pressable
        style={[
          styles.button,
          isOptionSelected('symbols') && styles.selectedButton,
        ]}
        onPress={() => handleOptionPress('symbols')}
      >
        <Text style={styles.buttonText}>Symbols</Text>
      </Pressable>
      <Pressable
        style={[
          styles.button,
          isOptionSelected('numbers') && styles.selectedButton,
        ]}
        onPress={() => handleOptionPress('numbers')}
      >
        <Text style={styles.buttonText}>Numbers</Text>
      </Pressable>
      <Text style={styles.selectedOptionText}>
        Selected Options: {selectedOptions.join(', ') || 'None'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 8,
  },
  selectedButton: {
    backgroundColor: 'gray',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  selectedOptionText: {
    fontSize: 18,
    marginTop: 16,
  },
});

export default MyComponent;
