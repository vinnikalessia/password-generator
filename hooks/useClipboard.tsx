import { NotificationFeedbackType, notificationAsync } from 'expo-haptics'
import { setStringAsync } from 'expo-clipboard';

export default () => {
  const copyToClipboard = async (generatedPassword: any) => {
    notificationAsync(NotificationFeedbackType.Success)
    console.log('copied to clipboard')
    await setStringAsync(generatedPassword)
  }

  return {
    copyToClipboard
  }
}
