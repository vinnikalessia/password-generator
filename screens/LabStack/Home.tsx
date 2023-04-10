import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types'
import {View, Text, Pressable, StyleSheet} from 'react-native';

export default () => {
    const {navigate} = useNavigation<StackNavigationProp<ParamListBase, 'LabStack'>>();
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Generate password</Text>
            <Text style={styles.subtitle}>Choose the parameters</Text>
            <Pressable onPress={() => {navigate('Check')}} style={styles.button}>
                <Text style={styles.buttontext}>check your password here</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8F0F3',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#2A9D8F',
    },
    subtitle: {
        fontSize: 18,
        marginTop: 8,
        color: '#2A9D8F',
    }, 
    button: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttontext: {
        color: '#2A9D8F',
    }
})