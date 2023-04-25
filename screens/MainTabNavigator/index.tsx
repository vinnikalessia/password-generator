// import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';
import {
    BottomTabBarProps,
    BottomTabHeaderProps,
    BottomTabNavigationOptions,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import 'react-native-gesture-handler';
import Generate from './Generate';
import Check from './Check';
import Ionicons from '@expo/vector-icons/Ionicons'

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
                    tabBarActiveTintColor: "#2A9D8F",
                    tabBarInactiveTintColor: "#B4DDD8",
                    tabBarIcon:({color, focused, size}) => (
                        <Ionicons name="lock-closed-outline" size={size} color={"#2A9D8F"} style={focused ? {opacity: 1} : {opacity: .35}}>
                        </Ionicons>
            )}}/>
            <Tab.Screen
                name={AppNavigators.CheckStack}
                component={Check}
                options={{
                    title:'Check',
                    tabBarActiveTintColor: "#2A9D8F",
                    tabBarInactiveTintColor: "#B4DDD8",
                    tabBarIcon:({color, focused, size}) => (
                        <Ionicons name="checkmark-outline" size={size} color={"#2A9D8F"} style={focused ? {opacity: 1} : {opacity: .35}}>
                        </Ionicons>
            )}}/>
        </Tab.Navigator>
    )
}



