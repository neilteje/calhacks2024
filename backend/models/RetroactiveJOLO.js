import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const RetroactiveJOLO = () => {
  const [textInput, setTextInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const handleGenerateAudio = async () => {
    setLoading(true);
    try {
      const url = 'https://api.hyperbolic.xyz/v1/audio/generation';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_HYPERBOLIC_API_KEY',
        },
        body: JSON.stringify({
          text: textInput,
          speed: 1, // adjust as needed
          voice: 'Melo-TTS', // specifying the voice model
        }),
      });

      const json = await response.json();
      const audioUrl = json.audio;
      setAudioUrl(audioUrl);
      console.log("Generated audio URL:", audioUrl);
    } catch (error) {
      console.error("Error generating audio:", error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Retroactive JOLO Entry</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Type your thoughts here..."
        value={textInput}
        onChangeText={setTextInput}
        multiline
      />
      <TouchableOpacity onPress={handleGenerateAudio} style={styles.generateButton}>
        <Text style={styles.generateButtonText}>
          {loading ? <ActivityIndicator size="small" color="#FFF" /> : "Generate Audio"}
        </Text>
      </TouchableOpacity>
      {audioUrl && (
        <View style={styles.audioPlayer}>
          <Ionicons name="play" size={24} color="#FFF" onPress={() => console.log("Play audio:", audioUrl)} />
          <Text style={styles.audioUrlText}>{audioUrl}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
  },
  textInput: {
    backgroundColor: '#333',
    color: '#FFF',
    padding: 10,
    borderRadius: 5,
    height: 150,
    marginBottom: 15,
  },
  generateButton: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  generateButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  audioPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  audioUrlText: {
    color: '#AAA',
    marginLeft: 10,
  },
});

export default RetroactiveJOLO;
