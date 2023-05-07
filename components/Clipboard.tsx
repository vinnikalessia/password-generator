// imports
import { View, Text, Pressable, Alert} from 'react-native'
import { NotificationFeedbackType, notificationAsync } from 'expo-haptics'
import { setStringAsync } from 'expo-clipboard';
import Ionicons from '@expo/vector-icons/Ionicons'

// styles
import styles from '../styles/generate'

export default ({generatedPassword}: {generatedPassword: string}) => {
    const copyToClipboard = async () => {
        notificationAsync(NotificationFeedbackType.Success)
        Alert.alert('Copied to clipboard', 'Your password is copied to clipboard.', [
          {
            text: 'OK'
          },
        ])
        await setStringAsync(generatedPassword);
    };

    return (
        <View style={styles.copy}>
          <Text style={styles.output}>{generatedPassword}</Text>
          <Pressable onPress={copyToClipboard}>
            <Ionicons name="clipboard-outline" style={styles.copyIcon} size={23} />
          </Pressable>
        </View>
    )
}