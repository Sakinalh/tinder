import React from 'react';
import {StyleSheet, View, SafeAreaView, Text, Pressable} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TopBarNavigator from './src/components/TopBarNavigator/index';

//import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Amplify from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native';
import config from './src/aws-exports';
import ProfileScreen from './src/screens/ProfileScreen';
import NavigationMenu from './src/components/NavigationMenu';

Amplify.configure(config);
//const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    // <SafeAreaView>
    //   <TopBarNavigator />
    // </SafeAreaView>
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
