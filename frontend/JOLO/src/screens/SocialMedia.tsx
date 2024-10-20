import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const SocialMediaFeed = () => {
  const [posts, setPosts] = useState([]);
  const [isLoadingTranslation, setIsLoadingTranslation] = useState(false);
  const [translatedAudio, setTranslatedAudio] = useState<string | null>(null);

  const fetchPosts = async () => {
    // Fetch posts, each with audio in English
    const response = await axios.get('https://api.example.com/posts');
    setPosts(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const translateAudio = async (audioFile: string, targetLanguage: string) => {
    setIsLoadingTranslation(true);
    try {
      const response = await axios.post('https://api.cartesia.ai/translate', {
        audioUrl: audioFile,
        targetLanguage,
      });

      if (response.data && response.data.translatedAudioUrl) {
        setTranslatedAudio(response.data.translatedAudioUrl);
      }
    } catch (error) {
      console.error("Error translating audio:", error);
    } finally {
      setIsLoadingTranslation(false);
    }
  };

  const handleTranslate = (audioFile: string) => {
    translateAudio(audioFile, 'es'); 
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text>{item.content}</Text>
            <TouchableOpacity 
              style={styles.translateButton}
              onPress={() => handleTranslate(item.audioFile)}
            >
              {isLoadingTranslation ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <Text style={styles.buttonText}>Translate Audio</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#121212',
  },
  postCard: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  postTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  translateButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default SocialMediaFeed;
