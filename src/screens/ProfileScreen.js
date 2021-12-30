import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import users from '../../assets/data/users';
import {Picker} from '@react-native-picker/picker';
import {User} from '../models/';
import {DataStore} from '@aws-amplify/datastore';
import {Auth} from 'aws-amplify';

export default function ProfileScreen() {
  const [name, setName] = useState();
  const [bio, setBio] = useState();
  const [gender, setGender] = useState();
  const [lookingFor, setLookingFor] = useState();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const currentUser = await Auth.currentAuthenticatedUser();
      console.log('current ', currentUser.attributes);
      const dbUsers = await DataStore.query(User, dbUser =>
        dbUser.sub('eq', currentUser.attributes.sub),
      );
      if (dbUsers.length <= 0) {
        return;
      }
      const dbUser = dbUsers[0];
      console.log('dbUser', dbUser);

      setName(dbUser.name);
      setBio(dbUser.bio);
      setGender(dbUser.gender);
      setLookingFor(dbUser.lookingFor);
      setUser(dbUser);
    };
    getCurrentUser();
  }, []);

  const isValid = () => {
    return name && bio && gender && lookingFor;
  };

  const save = async () => {
    if (!isValid()) {
      console.warn('Not valid');
      return;
    }

    if (user) {
      await DataStore.save(
        User.copyOf(user, updated => {
          updated.name = name;
          updated.bio = bio;
          updated.gender = gender;
          updated.lookingFor = lookingFor;
        }),
      );
    } else {
      const currentUser = await Auth.currentAuthenticatedUser();

      const newUser = new User({
        sub: currentUser?.attributes.sub,
        name,
        bio,
        gender,
        lookingFor,
        image:
          'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png',
      });
      await DataStore.save(newUser);
    }
    Alert.alert('User saved successfully');
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <TextInput
          onChangeText={setName}
          style={styles.textInput}
          value={name}
          placeholder="Name..."
        />
        <TextInput
          onChangeText={setBio}
          multiple={true}
          numberOfLines={3}
          style={styles.textInput}
          value={bio}
          placeholder="Bio..."
        />
        <Text>Gender</Text>

        <Picker
          label="Gender"
          selectedValue={gender}
          onValueChange={itemValue => setGender(itemValue)}>
          <Picker.Item label="Male" value="MALE" />
          <Picker.Item label="Female" value="FEMALE" />
        </Picker>

        <Text>Looking for</Text>

        <Picker
          label="Looking for"
          selectedValue={lookingFor}
          onValueChange={itemValue => setLookingFor(itemValue)}>
          <Picker.Item label="Male" value="MALE" />
          <Picker.Item label="Female" value="FEMALE" />
        </Picker>

        <Pressable style={styles.buttonSignout} onPress={() => save()}>
          <Text>Save</Text>
        </Pressable>

        <Pressable style={styles.buttonSignout} onPress={() => Auth.signOut()}>
          <Text>Sign out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    padding: 10,
    flex: 1,
  },
  container: {
    padding: 10,
  },
  textInput: {
    margin: 10,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  buttonSignout: {
    backgroundColor: '#F63A6E',
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 10,
  },
});
