import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, SafeAreaView, Text} from 'react-native';
import Card from '../components/TinderCard';
import AnimatedStack from '../components/AnimatedStack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {DataStore} from '@aws-amplify/datastore';
import {User, Matches} from '../models/';
import {Auth} from 'aws-amplify';
import NavigationMenu from '../components/NavigationMenu';

export default function HomeScreen({navigation}) {
  const [users, setUsers] = useState(null);
  const [me, setMe] = useState(null);

  const loader = useRef(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await Auth.currentAuthenticatedUser();
      const dbUsers = await DataStore.query(User, u =>
        u.sub('eq', user.attributes.sub),
      );
      if (dbUsers.length <= 0) {
        return;
      }
      console.log('ME = ', dbUsers[0]);
      setMe(dbUsers[0]);
    };

    getCurrentUser();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const userConnected = await Auth.currentAuthenticatedUser();

      const _users = await DataStore.query(User, u =>
        u.sub('ne', userConnected.attributes.sub),
      );
      setUsers([..._users]);

      _users.forEach((user, index) => {
        console.log(`INDEX ${index} `, user);
      });
    };

    if (!users) {
      fetchUsers();
    }
  });

  const onSwipeLeft = async () => {
    if (!me) {
      return;
    }
    // await DataStore.query(
    //   new Matches({
    //     userIdOne: me.id,
    //     userIdTwo: currentUser.id,
    //     UserOne: me,
    //     UsersTwo: currentUser,
    //     isMatch: false,
    //   }),
    // );
    console.warn('swipe left');
  };
  const onSwipeRight = async _currentProfile => {
    if (!_currentProfile || !me) {
      return;
    }

    const myMatches = await DataStore.query(Matches, match =>
      match.userIdOne('eq', me.id).userIdTwo('eq', _currentProfile.id),
    );
    if (myMatches.length > 0) {
      console.warn(
        'You alredy swiped right to this user =>  ',
        _currentProfile,
      );

      return;
    }

    const hisMatches = await DataStore.query(Matches, match =>
      match.userIdOne('eq', _currentProfile.id).userIdTwo('eq', me.id),
    );

    if (hisMatches.length > 0) {
      console.warn('yeh this is a new match ');
      const hisMatch = hisMatches[0];
      DataStore.save(
        User.copyOf(hisMatch, updated => (updated.isMatch = true)),
      );
      return;
    }

    DataStore.save(
      new Matches({
        userIdOne: me?.id,
        userIdTwo: _currentProfile?.id,
        isMatch: false,
      }),
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.pageContainer}>
        <NavigationMenu />
        <View style={styles.pageContainer}>
          {users ? (
            <AnimatedStack
              data={users}
              renderItem={({item}) => <Card user={item} />}
              onSwipeRight={onSwipeRight}
              onSwipeLeft={onSwipeLeft}
            />
          ) : (
            <Text ref={loader}>Loading</Text>
          )}
          <View style={styles.icons}>
            <View style={styles.button}>
              <FontAwesome name="undo" size={24} color="#FBD88B" />
            </View>
            <View style={styles.button}>
              <Entypo name="cross" size={24} color="#F76C6B" />
            </View>
            <View style={styles.button}>
              <FontAwesome name="star" size={24} color="#3AB4CC" />
            </View>
            <View style={styles.button}>
              <FontAwesome name="heart" size={24} color="#4FCC94" />
            </View>
            <View style={styles.button}>
              <Ionicons name="flash" size={24} color="#A65CD2" />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  topNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  // pageContainer: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   flex: 1,
  //   width: '100%',
  //   backgroundColor: '#ededed',
  // },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 50,
  },
});
