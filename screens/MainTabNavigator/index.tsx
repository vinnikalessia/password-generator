import {
    BottomTabNavigationOptions,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import 'react-native-gesture-handler';
import Generate from './Generate';
import Check from './Check';
import Ionicons from '@expo/vector-icons/Ionicons'
import styles from "../../styles/colors"

const Tab = createBottomTabNavigator()

export enum AppNavigators {
    GenerateStack = 'GenerateStack',
    CheckStack = 'CheckStack',
}

export function MainTabNavigator() {
    const screenOptions: BottomTabNavigationOptions = {
        headerShown: false,
    }

    return (
        <Tab.Navigator screenOptions={screenOptions} sceneContainerStyle={{backgroundColor: "black", flex: 1}}>
            <Tab.Screen
                name={AppNavigators.GenerateStack}
                component={Generate}
                options={{
                    title:'Generate',
                    tabBarActiveTintColor: styles.neutral[100],
                    tabBarInactiveTintColor: styles.neutral[200],
                    tabBarIcon:({focused, size}) => (
                        <Ionicons name="lock-closed-outline" size={size} color={styles.neutral[100]} style={focused ? {opacity: 1} : {opacity: .35}}>
                        </Ionicons>
            )}}/>
            <Tab.Screen
                name={AppNavigators.CheckStack}
                component={Check}
                options={{
                    title:'Check',
                    tabBarActiveTintColor: styles.neutral[100],
                    tabBarInactiveTintColor: styles.neutral[200],
                    tabBarIcon:({focused, size}) => (
                        <Ionicons name="checkmark-outline" size={size} color={styles.neutral[100]} style={focused ? {opacity: 1} : {opacity: .35}}>
                        </Ionicons>
            )}}/>
        </Tab.Navigator>
    )
}



