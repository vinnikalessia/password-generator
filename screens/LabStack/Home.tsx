import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { TextInput } from 'react-native-gesture-handler'
import { useState } from 'react'

type Option = 'lowercase' | 'uppercase' | 'symbols' | 'numbers'

export default () => {
  const { navigate } =
    useNavigation<StackNavigationProp<ParamListBase, 'LabStack'>>()
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([])

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

      <View>
        <Text>here is the output</Text>
      </View>
      <Text>this is how secure the password is</Text>

      <View style={styles.paramContainer}>
        <TextInput
          keyboardType="numeric"
          style={[styles.gridItem, styles.bigGridItem]}
          placeholder="length"
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
          // onPress={() => handleOptionPress()}
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
})
