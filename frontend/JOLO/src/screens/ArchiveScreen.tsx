import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ArchiveScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Archive</Text>
      <Text>Browse through your saved prompts and responses.</Text>
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

export default ArchiveScreen;
