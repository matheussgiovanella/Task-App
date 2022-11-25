import React from 'react'
import { StatusBar } from 'expo-status-bar';

import ViewMenu from './src/screens/ViewMenu';
import ViewLogin from './src/screens/ViewLogin';
import ViewTasks from './src/screens/ViewTasks';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoadingScreen from './src/screens/LoadingScreen';

import { useFonts } from 'expo-font'
import { Ubuntu_700Bold } from '@expo-google-fonts/ubuntu'

const Stack = createNativeStackNavigator();

export default function App () {

    const [fontsLoaded] = useFonts(
        {
            'Ubuntu-Regular': require('./src/assets/fonts/Ubuntu-Regular.ttf'),
            Ubuntu_700Bold
        }
    )
    if (fontsLoaded)
    {
        return (
            <>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{ headerShown: false }}
                        initialRouteName="ViewLogin"
                    >
                        <Stack.Screen name="ViewLogin" component={ViewLogin} />
                        <Stack.Screen name="ViewMenu" component={ViewMenu} />
                        <Stack.Screen name="ViewTasks" component={ViewTasks} />
                    </Stack.Navigator>
                </NavigationContainer>
    
                <StatusBar
                    backgroundColor="#333"
                    translucent={false}
                    style="auto"
                />
            </>
        );
    }
    else
    {
        return (
            <LoadingScreen />
        )
    }
}