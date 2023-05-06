import { StyleSheet} from 'react-native'
import colors from './colors'


export default StyleSheet.create({
    generic: {
        flex: 1,
        backgroundColor: colors.neutral[500],
        alignItems: 'center',
        justifyContent: 'center',
      },
    
      header: {
        marginBottom: 20,
        fontWeight: 'bold',
        fontSize: 20,
      },
    
      text: {
        marginTop: 20,
      },
})