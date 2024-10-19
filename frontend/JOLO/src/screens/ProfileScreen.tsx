import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity , ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';



const ProfileScreen = ({ route }: { route: any }) => {
  const { user, email } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Ionicons 
        name="person-circle-outline" 
        size={60} 
        color="#FFF" 
        style={styles.icon} 
      />
      <Text style= {styles.greeting}>{user}</Text>
      <Text style= {styles.email}>{email}</Text>
      <View style={styles.message_title}>
      <Ionicons name="chatbubble-outline" size={24} color="#FFF" />
      <Text style={styles.message_title_text}>Message From Dev Team</Text>
      </View>
      <Text style={styles.message}>Hi {user}! Thank you for testing our MVP. If you have any question or suggestion, please fill and submit the form below! Thanks. </Text>
      <TouchableOpacity style={styles.dropdown}>
        <Text style={styles.dropdownText}>Request a Feature</Text>
        <Ionicons name="chevron-down" size={16} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.dropdown}>
        <Text style={styles.dropdownText}>Suggestion?</Text>
        <Ionicons name="chevron-down" size={16} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.dropdown}>
        <Text style={styles.dropdownText}>Message to Dev Team</Text>
        <Ionicons name="chevron-down" size={16} color="#000" />
      </TouchableOpacity>

    </View>
    </ScrollView>

  );
};
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Ensures the content stretches to fill the screen
    justifyContent: 'center', // Center the content if it's shorter than the screen
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
    color: '#6200ea',
    paddingTop: height * 0.03, // 20% of screen height
    marginLeft: 0.03
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white'
  },
  greeting:{
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white'
  },
  email:{
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 25,
    color: 'white'
  },
  icon: {
    marginBottom: 20
  },
  message_title: {
    flexDirection: 'row', // Horizontal layout for icon and text
    alignItems: 'center', // Vertical alignment of icon and text

    alignSelf: 'flex-start',
  },
  message_title_text: {
    fontSize: 18,
    color: 'white',
    marginLeft: 8, // Spacing between icon and text
    fontWeight: 'bold',
    
  },
  message:{
    fontSize: 16,
    color: 'white',
    marginTop: 15,
    marginBottom: 20


  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e3dfde',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: '100%', // Width of the dropdown
    marginBottom: 10

  },
  dropdownText: {
    color: 'black',
    fontSize: 18,
    flex: 1, // Make text take the available space
    fontWeight: 'bold',
    padding: 10,
  
  },
});

export default ProfileScreen;
