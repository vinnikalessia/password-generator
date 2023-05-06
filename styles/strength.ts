import { StyleSheet} from 'react-native'
import colors from './colors'

export default StyleSheet.create({
    passwordStrength: {
        fontSize: 12,
        marginBottom: 4,
      },
      strengthMeter: {
        backgroundColor: colors.neutral[600],
        marginBottom: 4,
        width: 230,
        height: 4,
      },
      strengthMeterBar: {
        height: 4,
      },
})