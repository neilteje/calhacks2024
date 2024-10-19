import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <View style={styles.headerIcons}>
            <Ionicons name="notifications-outline" size={24} color="#FFF" style={styles.icon} />
            <Ionicons name="settings-outline" size={24} color="#FFF" style={styles.icon} />
          </View>
        </View>
        
        <Text style={styles.greeting}>Good afternoon, Neil</Text>
        <Text style={styles.subtitle}>Welcome back to JOLO.</Text>
        
        <View style={styles.promptContainer}>
          <Text style={styles.promptDate}>November 28, 2023</Text>
          <Text style={styles.promptTitle}>What do I need to change about myself?</Text>
          <Text style={styles.promptDescription}>
            Lorem ipsum dolor sit amet consectetur. In lorem pretium nec enim nisl urna. 
            Justo arcu leo sed a sagittis non dictumst tellus. Convallis tellus auctor sem 
            pulvinar eget in ultricies pulvinar mattis. Felis et at velit sit quis elit.
          </Text>
        </View>

        <View style={styles.journalInfo}>
          <Text style={styles.journalText}>Journal out Loud before today fades away</Text>
          <Text style={styles.timeLeft}>12 hours 44 minutes left</Text>
        </View>
        
        <TouchableOpacity style={styles.recordButton}>
          <Ionicons name="mic" size={24} color="#FFF" />
          <Text style={styles.recordButtonText}>Tap to Record</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  logo: {
    width: 70,
    height: 30,
    resizeMode: 'contain',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFF',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#AAA',
    marginBottom: 20,
  },
  promptContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  promptDate: {
    fontSize: 14,
    color: '#AAA',
    marginBottom: 10,
  },
  promptTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  promptDescription: {
    fontSize: 14,
    color: '#CCC',
    textAlign: 'center',
  },
  journalInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  journalText: {
    fontSize: 16,
    color: '#FFF',
  },
  timeLeft: {
    fontSize: 14,
    color: '#AAA',
    marginTop: 5,
  },
  recordButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  recordButtonText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default HomeScreen;
