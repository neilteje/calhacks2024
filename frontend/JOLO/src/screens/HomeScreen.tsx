import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Vapi from '@vapi-ai/react-native';
import SoundPulseVisualizer from '../components/SoundPulseVisualizer';
import axios from 'axios';

const audioRecorderPlayer = new AudioRecorderPlayer();
const vapi = new Vapi("248735ad-a5b8-4690-bfb3-e607fc70026d");

const getGreeting = (): string => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return 'Good morning, Neil!';
  } else if (currentHour < 18) {
    return 'Good afternoon, Neil!';
  } else {
    return 'Good evening, Neil!';
  }
};

const getDate = (): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString('en-US', options);
};

const HomeScreen = () => {
  const [recording, setRecording] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [decibelLevel, setDecibelLevel] = useState(0);
  const [_responseText, setResponseText] = useState("");
  const [todaysQuestion, setTodaysQuestion] = useState("");

  useEffect(() => {
    const fetchTodaysQuestion = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/questions');
        const today = new Date().toISOString().split('T')[0];
        const question = response.data.find((q: any) => {
          const questionDate = new Date(q.createdAt).toISOString().split('T')[0];
          return questionDate === today;
        });
        if (question) {
          setTodaysQuestion(question.text);
        } else {
          setTodaysQuestion("No question available for today.");
        }
      } catch (error) {
        console.error("Error fetching today's question:", error);
      }
    };

    fetchTodaysQuestion();

    // VAPI event listeners
    vapi.on('call-start', () => console.log('Call has started'));
    vapi.on('call-end', () => console.log('Call has ended'));
    vapi.on('message', (message) => {
      if (message && message.content) {
        setResponseText((prev) => `${prev}\nAssistant: ${message.content}`);
      }
    });
    vapi.on('error', (e) => console.error(e));

    // Cleanup on unmount
    return () => {
      vapi.stop();
    };
  }, []);

  const startRecording = async () => {
    try {
      audioRecorderPlayer.startRecorder().then(() => {
        audioRecorderPlayer.addRecordBackListener((e) => {
          setDecibelLevel(e.currentMetering || 0);
          console.log("Decibel Level:", e.currentMetering); 
        });
      });
      setRecording(true);
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  const stopRecording = async () => {
    try {
      await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setRecording(false);
      setDecibelLevel(0);
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  };

  const startAssistant = async () => {
    try {
      // Start recording audio
      await audioRecorderPlayer.startRecorder();
      audioRecorderPlayer.addRecordBackListener(async (e) => {
        if (e.currentMetering) {
          vapi.send({
            type: 'add-message',
            message: {
              role: 'user',
              content: String(e.currentMetering || 0),
            },
          });
        }
      });
  
      // Start VAPI Assistant
      vapi.start("7ee9572b-2391-4fb6-ae4b-f968dadcd3be");
  
      setSessionActive(true);
    } catch (error) {
      console.error('Error starting assistant:', error);
    }
  };
  
  const stopAssistant = async () => {
    try {
      // Stop recording audio
      await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
  
      // Stop VAPI Assistant
      vapi.stop();
      setSessionActive(false);
    } catch (error) {
      console.error('Error stopping assistant:', error);
    }
  };
    return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <View style={styles.headerIcons}>
            <Ionicons name="notifications-outline" size={24} color="#FFF" style={styles.icon} />
            <Ionicons name="settings-outline" size={24} color="#FFF" style={styles.icon} />
          </View>
        </View>
        
        {/* Greetings */}
        <Text style={styles.greeting}>{getGreeting()}</Text>
        <Text style={styles.subtitle}>Welcome back to JOLO.</Text>
        
        {/* Daily Prompt */}
        <View style={styles.promptContainer}>
          <Text style={styles.promptDate}>{getDate()}</Text>
          <Text style={styles.promptTitle}>Today's Prompt:</Text>
          <Text style={styles.promptDescription}>
            {todaysQuestion}
          </Text>
        </View>

        {/* Recording Section */}
        <View style={styles.journalInfo}>
          <Text style={styles.journalText}>Journal out Loud before today fades away</Text>
          <Text style={styles.timeLeft}>12 hours 44 minutes left</Text>
        </View>
        
        <View style={styles.recordingSection}>
          <SoundPulseVisualizer decibelLevel={decibelLevel} />
          <TouchableOpacity 
            style={styles.recordButton} 
            onPress={recording ? stopRecording : startRecording}
          >
            <Ionicons name={recording ? 'stop' : 'mic'} size={24} color="#FFF" />
            <Text style={styles.recordButtonText}>{recording ? 'Stop Recording' : 'Tap to Record'}</Text>
          </TouchableOpacity>
        </View>

        {/* VAPI Assistant Button */}
        <TouchableOpacity 
          style={styles.vapiButton} 
          onPress={sessionActive ? stopAssistant : startAssistant}
        >
          <Ionicons name="mic-circle-outline" size={30} color="#FFF" />
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
    width: 100,
    height: 40,
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
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#AAA',
    marginBottom: 20,
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: 10,
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
  recordingSection: {
    alignItems: 'center',
    marginTop: 30,
  },
  recordButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  recordButtonText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 10,
  },
  vapiButton: {
    position: 'absolute',
    bottom: -60,
    right: 20, 
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
