import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Card from './src/components/TinderCard';
import users from './assets/data/users';

const App = () => {
  return (
    <View style={styles.pageContainer}>
      {/* {users.map(user => (
        <Card key={user.id} user={user} />
      ))} */}
      <Card key={users[0].id} user={users[0]} />
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default App;
