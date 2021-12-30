import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Amplify from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native';
import config from './src/aws-exports';
import ProfileScreen from './src/screens/ProfileScreen';

Amplify.configure(config);
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer initialRouteName="Home">
      <Stack.Navigator options={{showNavigation: false}}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Matches" component={MatchesScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default withAuthenticator(App);
