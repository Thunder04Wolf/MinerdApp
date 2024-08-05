import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RegisterVisitScreen from './screens/RegisterVisitScreen';
import ViewVisitsScreen from './screens/ViewVisitScreen';
import VisitDetailScreen from './screens/VisitDetailScreen';
import AboutScreen from './screens/AboutScreen'; 
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={HomeScreen} options={{
          headerLeft: null,
          gestureEnabled: false,
        }} />
        <Stack.Screen name="RegisterVisit" component={RegisterVisitScreen} />
        <Stack.Screen name="ViewVisits" component={ViewVisitsScreen} />
        <Stack.Screen name="VisitDetail" component={VisitDetailScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
