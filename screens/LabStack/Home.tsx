import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types'
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default () => {
    const {navigate} = useNavigation<StackNavigationProp<ParamListBase, 'LabStack'>>();
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Generate password</Text>
            <Text style={styles.subtitle}>Choose the parameters</Text>

            <Text>Output</Text>
            <Text>Length</Text>

            <View style={styles.paramContainer}>
                <Pressable style={[styles.gridItem, styles.firstGridItem]}><Text>lengte</Text></Pressable>
                
                <Pressable style={styles.gridItem}><Text>A</Text></Pressable>
                <Pressable style={styles.gridItem}><Text>a</Text></Pressable>
                <Pressable style={styles.gridItem}><Text>&!</Text></Pressable>
                <Pressable style={styles.gridItem}><Text>123</Text></Pressable>
            </View>



            <Pressable onPress={() => {navigate('Check')}} style={styles.button}>
                <Text style={styles.buttontext}>check your password here</Text>
                <Ionicons name="arrow-forward-outline" size={23} color="#264653" />
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
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttontext: {
        color: '#2A9D8F',
    },
    paramContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridItem: {
        width: '30%',
        height: 96,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFF',
        borderRadius: 5,
        margin: 8,
    },
    firstGridItem: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '65%',
        height: 56,
        backgroundColor: '#FFF',
    },
    gridItemText: {
        fontSize: 18,
    },
    
})