import { ParamListBase, useFocusEffect, useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import {View, Text, Button} from 'react-native';

export default () => {
    const { setOptions, goBack} = useNavigation<StackNavigationProp<ParamListBase, 'LabStack'>>();

    return (
        <View>
            <Text>This is chekpage!!</Text>
            {/* <Button title="I want to go home" onPress={() => goBack()} /> */}
        </View>
    );
}