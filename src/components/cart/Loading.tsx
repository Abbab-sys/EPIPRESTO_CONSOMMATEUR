import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

/*
 * Name: Loading
 * Description: This component is used to display a loading animation when the app is loading data from the server
 * Author: Alessandro van Reusel
 */

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        style={{alignSelf: 'center'}}
        size="large"
        color="#FFA500"></ActivityIndicator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;
