import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Home from './Home';
import Check from './Check';

const Stack = createStackNavigator();

export function LabStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Check" component={Check}/>
        </Stack.Navigator>
    )
}



