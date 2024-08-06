import React, { useContext } from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider, AuthContext } from './AuthContext';
import HomeScreen from './screens/HomeScreen';
import RegisterIncidenceScreen from './screens/RegisterIncidenceScreen';
import ViewIncidenceScreen from './screens/ViewIncidenceScreen';
import IncidenceDetailScreen from './screens/IncidenceDetailScreen';
import AboutScreen from './screens/AboutScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import TechMenu from './screens/TechMenu';
import RegisterVisit from './screens/RegisterVisitScreen';
import NoticiasScreen from './screens/NoticiasScreen';
import ViewOurVisit from './screens/ViewOurVisit';
import ViewAllVisit from './screens/ViewAllVisit';
import VisitDetailsScreen from './screens/VisitDetailsScreen';
import SearchSchoolsByRegion from './screens/SearchSchoolsByRegion';
import SchoolDetails from './screens/SchoolDetails';
import ListDirectors from './screens/ListDirectors';
import MapScreen from './screens/MapScreen';

// Create stacks
const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

// Auth stack
function AuthStackScreen() {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerBackVisible: false }} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

// Main stack
function MainStackScreen() {
  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="TechMenu" component={TechMenu} />
      <MainStack.Screen name="Noticias" component={NoticiasScreen} />
      <MainStack.Screen name="RegisterIncidents" component={RegisterIncidenceScreen} />
      <MainStack.Screen name="ViewIncidents" component={ViewIncidenceScreen} />
      <MainStack.Screen name="IncidentsDetail" component={IncidenceDetailScreen} />
      <MainStack.Screen name="RegisterVisit" component={RegisterVisit} />
      <MainStack.Screen name="ViewOurVisits" component={ViewOurVisit} />
      <MainStack.Screen name="ViewAllVisits" component={ViewAllVisit} />
      <MainStack.Screen name="VisitDetailsScreen" component={VisitDetailsScreen} />
      <MainStack.Screen name="SearchSchoolsByRegion" component={SearchSchoolsByRegion} />
      <MainStack.Screen name="SchoolDetails" component={SchoolDetails} />
      <MainStack.Screen name="ListDirectors" component={ListDirectors} />
      <MainStack.Screen name="MapScreen" component={MapScreen} />
      <MainStack.Screen name="About" component={AboutScreen} />
    </MainStack.Navigator>
  );
}

// Main App Component
export default function App() {
  const navigationRef = useNavigationContainerRef();

  return (
    <AuthProvider>
      <NavigationContainer ref={navigationRef}>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

const RootNavigator = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <MainStackScreen /> : <AuthStackScreen />;
};
