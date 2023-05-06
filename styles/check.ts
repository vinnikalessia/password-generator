import { StyleSheet} from 'react-native'
import colors from './colors'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.neutral[300],
        alignItems: 'center',
        marginTop: 48,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        color: colors.neutral[100],
      },
      input: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: 48,
        padding: 12,
        backgroundColor: colors.neutral[700],
        borderRadius: 5,
        margin: 24,
        width: '65%',
      },
      checkButton: {
        backgroundColor: colors.neutral[700],
        justifyContent: 'center',
        alignItems: 'center',
        width: '65%',
        height: 56,
        borderRadius: 5,
        margin: 8,
        marginTop: 24,
      },
      checkText: {
        fontSize: 18,
        color: colors.neutral[100],
      },
      bg:{
        backgroundColor: colors.neutral[300],
      },
})