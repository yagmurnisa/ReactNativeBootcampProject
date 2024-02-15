import 'react-native-gesture-handler'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Event from './src/screens/Event'
import Events from './src/screens/Events'
const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                options={{headerShown: false}}
                name='Events'
                component={Events}
                />
                <Stack.Screen
                name='Event'
                component={Event}
                />
               
            </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaView>
  )
}

export default App