import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types'
import {View, Text, Pressable} from 'react-native';

export default () => {
    const {navigate} = useNavigation<StackNavigationProp<ParamListBase, 'LabStack'>>();
    
    return (
        <View>
            <Text>This is homepage!!</Text>
            <Pressable onPress={() => {navigate('Check')}}>
                <Text>check your password here</Text>
            </Pressable>
        </View>
    );
}