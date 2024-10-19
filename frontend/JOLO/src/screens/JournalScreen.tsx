import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const JournalScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Journal Entries</Text>
      <Text>Here, you'll be able to record your thoughts and reflections.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaeaea',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default JournalScreen;
