import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

const Home = ({ navigation }) => (
  <View style={styles.container}>
    <Text>Check out my Homie, Screen!</Text>
    <Button title="Start Game"
      onPress={() => navigation.navigate('Game')} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
