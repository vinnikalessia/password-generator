import { View, Text, Pressable, StyleSheet, TextInput} from 'react-native'
import styles from '../styles/generate'

import { NotificationFeedbackType, notificationAsync } from 'expo-haptics'
import { setStringAsync } from 'expo-clipboard';
import Ionicons from '@expo/vector-icons/Ionicons'

export default ({generatedPassword}: {generatedPassword: string}) => {
    const copyToClipboard = async () => {
        notificationAsync(NotificationFeedbackType.Success)
        console.log('copied to clipboard')
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