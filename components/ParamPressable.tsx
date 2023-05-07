import { View, Text, Pressable, TextInput} from 'react-native'
import styles from '../styles/generate'


export default ({onChange, include, handleChange, context}: {onChange: Function, include: boolean, handleChange: any, context: string}) => {

    enum paramText {
        uppercase = 'A',
        lowercase = 'a',
        symbols = '&!',
        numbers = '123'
    }

    const getParamText = (context: string) => {
        switch (context) {
            case 'uppercase':
                return paramText.uppercase
            case 'lowercase':
                return paramText.lowercase
            case 'symbols':
                return paramText.symbols
            case 'numbers':
                return paramText.numbers
            default:
                return ''
        }
    }

    // if (onPress) {
    //     onChange(true)
    // }

    return (
        <Pressable
            style={[
              styles.gridItem,
              include ? styles.selectedButton : styles.gridItem,
            ]}
            onPress={() => handleChange(!include)}
          >
            <Text>{getParamText(context)}</Text>
          </Pressable>
    )
}

