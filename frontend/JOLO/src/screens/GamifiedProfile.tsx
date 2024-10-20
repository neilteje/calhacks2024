import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({  }: { route: any }) => {
  const [featureVisible, setFeatureVisible] = useState(false);
  const [suggestionVisible, setSuggestionVisible] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);

  const [featureText, setFeatureText] = useState('');
  const [suggestionText, setSuggestionText] = useState('');
  const [messageText, setMessageText] = useState('');

  // Gamification: Random data generation
  const [streak, setStreak] = useState(0);
  const [totalJournals, setTotalJournals] = useState(0);
  const [stars, setStars] = useState(0);

  useEffect(() => {
    // Randomly generate streak and total journal data
    const randomStreak = Math.floor(Math.random() * 365); // Random streak between 0 and 365
    const randomTotalJournals = Math.floor(Math.random() * 500); // Random total journal count
    setStreak(randomStreak);
    setTotalJournals(randomTotalJournals);

    // Determine stars based on activity (simplified logic)
    if (randomStreak === 365) {
      setStars(5);
    } else if (randomStreak >= 300) {
      setStars(4);
    } else if (randomStreak >= 200) {
      setStars(3);
    } else if (randomStreak >= 100) {
      setStars(2);
    } else {
      setStars(1);
    }
  }, []);

  const handleSubmit = (type: string) => {
    switch (type) {
      case 'feature':
        console.log("Feature submitted:", featureText);
        setFeatureText('');
        break;
      case 'suggestion':
        console.log("Suggestion submitted:", suggestionText);
        setSuggestionText('');
        break;
      case 'message':
        console.log("Message submitted:", messageText);
        setMessageText('');
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Profile</Text>
          </View>
          <Ionicons 
            name="person-circle-outline" 
            size={80} 
            color="#FFF" 
            style={styles.icon} 
          />
          <Text style={styles.greeting}>Neil Teje</Text>
          <Text style={styles.email}>nteje2@illinois.edu</Text>

          <View style={styles.messageTitleContainer}>
            <Ionicons name="chatbubble-outline" size={24} color="#FFF" />
            <Text style={styles.messageTitleText}>Message From Dev Team</Text>
          </View>
          
          <Text style={styles.message}>Hi Neil! Thank you for testing our MVP. If you have any question or suggestion, please fill and submit the form below! Thanks.</Text>

          {/* Gamification Section */}
          <View style={styles.gamificationContainer}>
            <Text style={styles.gamificationTitle}>Your Activity</Text>
            
            {/* Streak and Total Journals */}
            <Text style={styles.streakText}>Current Streak: {streak} days</Text>
            <Text style={styles.totalJournalsText}>Total Journals: {totalJournals}</Text>

            {/* Star Rating */}
            <View style={styles.starsContainer}>
              {Array(stars)
                .fill(null)
                .map((_, index) => (
                  <Ionicons key={index} name="star" size={24} color="#FFD700" />
                ))}
              {Array(5 - stars)
                .fill(null)
                .map((_, index) => (
                  <Ionicons key={index + stars} name="star-outline" size={24} color="#FFD700" />
                ))}
            </View>
            <Text style={styles.starRatingText}>Rating: {stars} / 5 stars</Text>
          </View>

          {/* Request a Feature */}
          <TouchableOpacity style={styles.dropdown} onPress={() => setFeatureVisible(!featureVisible)}>
            <Text style={styles.dropdownText}>Request a Feature</Text>
            <Ionicons name={featureVisible ? "chevron-up" : "chevron-down"} size={16} color="#000" />
          </TouchableOpacity>
          {featureVisible && (
            <View style={styles.dropdownContent}>
              <TextInput
                style={styles.input}
                placeholder="Enter your feature request..."
                placeholderTextColor="#888"
                value={featureText}
                onChangeText={setFeatureText}
              />
              <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit('feature')}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Suggestion */}
          <TouchableOpacity style={styles.dropdown} onPress={() => setSuggestionVisible(!suggestionVisible)}>
            <Text style={styles.dropdownText}>Suggestion?</Text>
            <Ionicons name={suggestionVisible ? "chevron-up" : "chevron-down"} size={16} color="#000" />
          </TouchableOpacity>
          {suggestionVisible && (
            <View style={styles.dropdownContent}>
              <TextInput
                style={styles.input}
                placeholder="Enter your suggestion..."
                placeholderTextColor="#888"
                value={suggestionText}
                onChangeText={setSuggestionText}
              />
              <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit('suggestion')}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Message to Dev Team */}
          <TouchableOpacity style={styles.dropdown} onPress={() => setMessageVisible(!messageVisible)}>
            <Text style={styles.dropdownText}>Message to Dev Team</Text>
            <Ionicons name={messageVisible ? "chevron-up" : "chevron-down"} size={16} color="#000" />
          </TouchableOpacity>
          {messageVisible && (
            <View style={styles.dropdownContent}>
              <TextInput
                style={styles.input}
                placeholder="Enter your message..."
                placeholderTextColor="#888"
                value={messageText}
                onChangeText={setMessageText}
              />
              <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit('message')}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  container: {
    width: '90%',
    alignItems: 'center',
  },
  header: {
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    marginTop: 10,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  icon: {
    marginTop: 20,
    marginBottom: 15,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#FFF',
    marginBottom: 25,
  },
  messageTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  messageTitleText: {
    fontSize: 18,
    color: '#FFF',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'left',
    alignSelf: 'stretch',
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e3dfde',
    borderRadius: 5,
    padding: 12,
    width: '100%',
    marginBottom: 10,
  },
  dropdownText: {
    color: 'black',
    fontSize: 18,
    flex: 1,
    fontWeight: 'bold',
  },
message.txt
9 KB