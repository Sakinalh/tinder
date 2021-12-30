import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../../screens/HomeScreen';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#F63274',
        labelStyle: {fontSize: 12},
        style: {backgroundColor: 'white'},
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{tabBarLabel: 'Home'}}
      />
      {/* <Tab.Screen
        name="Matches"
        component={MatchesScreen}
        options={{tabBarLabel: 'Matches'}}
      /> */}
    </Tab.Navigator>
  );
}

export default function TopBarNavigator() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
