// imports
import { View, Text } from 'react-native'

// styles
import strength from "../styles/strength"

// colors
import colors from '../styles/colors'

export default ({passwordStrength} : {passwordStrength: number}) => {
    enum strengthWord {
        Weak = 0,
        Fair = 1,
        Moderate = 2,
        Strong = 3,
        VeryStrong = 4
    }

    const getPasswordStrengthLabel = (strength: any) => {
        switch (strength) {
            case strengthWord.Weak:
                return 'Weak'
            case strengthWord.Fair:
                return 'Fair'
            case strengthWord.Moderate:
                return 'Moderate'
            case strengthWord.Strong:
                return 'Strong'
            case strengthWord.VeryStrong:
                return 'Very Strong'
            default:
                return ''
        }
    }

    const getPasswordStrengthColor = (strength: any) => {
        switch (strength) {
            case strengthWord.Weak:
                return colors.strength[100]
            case strengthWord.Fair:
                return colors.strength[200]
            case strengthWord.Moderate:
                return colors.strength[300]
            case strengthWord.Strong:
                return colors.strength[400]
            case strengthWord.VeryStrong:
                return colors.strength[500]
            default:
                return colors.strength[600]
        }
    }

    return(
        <View>
          <Text style={strength.passwordStrength}>
            Password Strength: {getPasswordStrengthLabel(passwordStrength)}
          </Text>
          <View style={strength.strengthMeter}>
            <View
              style={[
                strength.strengthMeterBar,
                { backgroundColor: getPasswordStrengthColor(passwordStrength) },
              ]}
            />
          </View>
        </View>
    )
}