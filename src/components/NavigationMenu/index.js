import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/core';

export default function NavigationMenu() {
  const color = '#b5b5b5';
  const selectedItemMenu = '#F63274';
  const navigation = useNavigation();

  return (
    <View style={styles.topNavigation}>
      <Pressable>
        <Fontisto name="tinder" size={30} color={selectedItemMenu} />
      </Pressable>
      <MaterialCommunityIcons name="star-four-points" size={30} color={color} />
      <Pressable onPress={() => navigation.navigate('Matches')}>
        <Ionicons name="ios-chatbubbles" size={30} color={color} />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Profile')}>
        <FontAwesome name="user" size={30} color={color} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  topNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
});
