import { StyleSheet} from 'react-native'
import colors from './colors'


export default StyleSheet.create({
    bg:{
        backgroundColor: colors.neutral[300],
      },
      container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 48,
      },
    
      // title styles
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        color: colors.neutral[100],
      },
      subtitle: {
        fontSize: 14,
        color: colors.neutral[100],
      },
    
      // generated password and copy
      copy: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
        marginBottom: 12,
      },
      output: {
        fontSize: 12,
        backgroundColor: colors.neutral[700],
        padding: 10,
        borderRadius: 6,
        width: 210,
      },
      copyIcon: {
        color: colors.neutral[100],
        paddingLeft: 8,
      },
    
      // parameters for generating password
      paramContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
        width: 235,
      },

      // slider and textinput
      slider:{
        width: 180,
        height: 40,
        color: colors.neutral[100],
        marginLeft: -10,
        marginRight: 4,
        marginBottom: 4,
      },
      sliderText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.neutral[700],
        borderRadius: 5,
        paddingVertical: 4,
        marginRight: 4,
      },

      // grid of buttons
      gridItem: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '46%',
        height: 96,
        backgroundColor: colors.neutral[700],
        borderRadius: 5,
        margin: 4,
      },
      selectedButton: {
        backgroundColor: colors.neutral[400],
        borderWidth: 2,
        borderColor: colors.neutral[100],
      },
    
      // button to generate password
      generateButton: {
        backgroundColor: colors.neutral[700],
        justifyContent: 'center',
        alignItems: 'center',
        width: '65%',
        height: 56,
        borderRadius: 5,
        margin: 8,
      },
      generateText: {
        fontSize: 18,
        color: colors.neutral[100],
      },
})