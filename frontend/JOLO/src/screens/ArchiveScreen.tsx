import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Slider } from '@react-native-assets/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RightArrowIcon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

type JournalEntryPrompt = {
  id: string;
  title: string;
  category: string;
  answers: string;
  audioFile: string[];
};

const ArchiveScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntryPrompt | null>(null);
  const [isLoadingTranslation, setIsLoadingTranslation] = useState(false);
  const [translatedAudio, setTranslatedAudio] = useState<string | null>(null);

  const openModal = (entry: any) => {
    setSelectedEntry(entry);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEntry(null);
  };

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

  const journalEntries = [
    { id: '1', title: 'What do I need to change about myself?', category: 'Reflection', answers: '3 times', audioFile: ['test.mp3'] },
    { id: '2', title: 'Am I taking care of myself physically?', category: 'Health', answers: '3 times', audioFile: ['test2.mp3'] },
    { id: '3', title: 'Have I achieved my goals this week?', category: 'Goals', answers: '3 times', audioFile: ['test3.mp3'] },
  ];

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
        
        <Text style={styles.greeting}>Journal archives</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Newest</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Oldest</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Category</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Random</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.archiveContainer}>
          {journalEntries.map((entry) => (
            <CardItem
              key={entry.id}
              title={entry.title}
              category={entry.category}
              answers={entry.answers}
              openModal={openModal}
              audioFile={entry.audioFile}
            />
          ))}
        </View>

        {selectedEntry && (
          <PopUpMenu
            selectedEntry={selectedEntry}
            modalVisible={modalVisible}
            closeModal={closeModal}
            translateAudio={translateAudio}
            isLoadingTranslation={isLoadingTranslation}
            translatedAudio={translatedAudio}
          />
        )}

      </ScrollView>
    </SafeAreaView>
  );
};

const PopUpMenu = (props: { 
  selectedEntry: any, 
  modalVisible: any, 
  closeModal: any, 
  translateAudio: (audioFile: string, targetLanguage: string) => void,
  isLoadingTranslation: boolean,
  translatedAudio: string | null
}) => {
  const handleTranslateClick = () => {
    const { audioFile } = props.selectedEntry;
    props.translateAudio(audioFile[0], 'fr'); // example: translating to French
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={props.closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView 
            contentContainerStyle={styles.scrollContainer} 
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <Text style={styles.greeting}>{props.selectedEntry.title}</Text>
            <Text style={styles.description}>
              Explore your thoughts in multiple languages.
            </Text>

            <TouchableOpacity style={styles.translateButton} onPress={handleTranslateClick}>
              {props.isLoadingTranslation ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <Text style={styles.buttonText}>Translate to French</Text>
              )}
            </TouchableOpacity>

            {props.translatedAudio && (
              <TouchableOpacity style={styles.playButton} onPress={() => {/* play translated audio */}}>
                <Text style={styles.buttonText}>Play Translated Audio</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.button} onPress={props.closeModal}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

type JournalEntryPrompt = {
  id: string;
  title: string;
  category: string;
  answers: string;
};

const ArchiveScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntryPrompt | null>(null);

  const openModal = (entry: any) => {
    setSelectedEntry(entry);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEntry(null);
  };

  const journalEntries = [
    { id: '1', title: 'What do I need to change about myself?', category: 'Reflection', answers: '3 times' },
    { id: '2', title: 'Am I taking care of myself physically?', category: 'Health', answers: '3 times' },
    { id: '3', title: 'Have I achieved my goals this week?', category: 'Goals', answers: '3 times' },
  ];
  

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
        
        <Text style={styles.greeting}>Journal archives</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Newest</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Oldest</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Category</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Random</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.archiveContainer}>
          {journalEntries.map((entry) => (
            <CardItem
              key={entry.id}
              title={entry.title}
              category={entry.category}
              answers={entry.answers}
              openModal={openModal}
            />
          ))}
        </View>

        {selectedEntry && (
          <PopUpMenu
            selectedEntry={selectedEntry}
            modalVisible={modalVisible}
            closeModal={closeModal}
          />
        )}

      </ScrollView>
    </SafeAreaView>
  );
};

const CardItem = (props: { key: string, title: string, category: string, answers: string, openModal: (entry: any) => void }) => {
  const { title, category, answers, openModal } = props;

  return (
    <TouchableOpacity style={styles.card} onPress={() => openModal({ title, category, answers })}>
      <View style={styles.cardTextContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.cardSubtitle}>Category: {props.category}</Text>
        <Text style={styles.cardSubtitle}>Answers: {props.answers}</Text>
      </View>
      <RightArrowIcon name="chevron-right" size={20} color="black" />
    </TouchableOpacity>
  );
};

const PopUpMenu = (props: { selectedEntry: any, modalVisible: any, closeModal: any }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={props.closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView 
            contentContainerStyle={styles.scrollContainer} 
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <Text style={styles.greeting}>{props.selectedEntry.title}</Text>
            <Text style={styles.description}>
              JOLO or write down your thoughts before the time expires today. Be as detailed as possible, and we'll handle the rest!
            </Text>
            <JournalEntry />
            <JournalEntry />
            <JournalEntry />
            <TouchableOpacity style={styles.button} onPress={props.closeModal}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const JournalEntry = () => {
  return (
    <View style={styles.entrySection}>
      <Text style={styles.date}>Nov 28, 2023</Text>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="white"
          maximumTrackTintColor="#555555"
          thumbTintColor="white"
          value={0.5}
          onValueChange={(value) => console.log(value)}
        />
        <TouchableOpacity style={styles.playButton}>
          <Ionicons name="play" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.keywordsContainer}>
        <View style={styles.keyword}><Text style={styles.keywordText}>keyword</Text></View>
        <View style={styles.keyword}><Text style={styles.keywordText}>keyword</Text></View>
        <View style={styles.keyword}><Text style={styles.keywordText}>keyword</Text></View>
      </View>
    </View>
  );
};

type JournalEntryPrompt = {
  id: string;
  title: string;
  category: string;
  answers: string;
  audioFile: string[];
};

const PostFileS3 = async (fileURI: any) => {
  try {
    const response = await fetch(fileURI);
    const blob = await response.blob();

    const result = await Storage.put('test3.mp3', blob, {
      contentType: 'audio/mpeg',
    });

    console.log('Upload successful:', result);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

const GetFileS3 = async (fileName: string) => {
  try {
    const fileURL = await Storage.get(fileName, { level: 'public' });

    const response = await axios.get(fileURL, { responseType: 'blob' });
    const blob = response.data;

    return fileURL;
  } catch (error) {
    console.error('Error fetching file:', error);
    return null;
  }
};

const ArchiveScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntryPrompt | null>(null);

  const openModal = (entry: any) => {
    setSelectedEntry(entry);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEntry(null);
  };

  const journalEntries = [
    { id: '1', title: 'What do I need to change about myself?', category: 'Reflection', answers: '3 times', audioFile: ['test.mp3', 'test2.mp3', 'test3.mp3'] },
    { id: '2', title: 'Am I taking care of myself physically?', category: 'Health', answers: '3 times', audioFile: ['test.mp3', 'test2.mp3', 'test3.mp3'] },
    { id: '3', title: 'Have I achieved my goals this week?', category: 'Goals', answers: '3 times', audioFile: ['test.mp3', 'test2.mp3', 'test3.mp3'] },
  ];
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <TouchableOpacity style={styles.button} onPress={() => PostFileS3('/Users/ritviksood/Desktop/jolo/calhacks2024/frontend/JOLO/files/test3.mp3')}>
        <Text style={styles.buttonText}>Upload MP3</Text>
      </TouchableOpacity>

        <View style={styles.header}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <View style={styles.headerIcons}>
            <Ionicons name="notifications-outline" size={24} color="#FFF" style={styles.icon} />
            <Ionicons name="settings-outline" size={24} color="#FFF" style={styles.icon} />
          </View>
        </View>
        
        <Text style={styles.greeting}>Journal archives</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Newest</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Oldest</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Category</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Random</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.archiveContainer}>
          {journalEntries.map((entry) => (
            <CardItem
              key={entry.id}
              title={entry.title}
              category={entry.category}
              answers={entry.answers}
              openModal={openModal}
              audioFile={entry.audioFile}
            />
          ))}
        </View>

        {selectedEntry && (
          <PopUpMenu
            selectedEntry={selectedEntry}
            modalVisible={modalVisible}
            closeModal={closeModal}
          />
        )}

      </ScrollView>
    </SafeAreaView>
  );
};

const CardItem = (props: { key: string, title: string, category: string, answers: string, openModal: (entry: any) => void , audioFile: string[]}) => {
  const { title, category, answers, openModal, audioFile } = props;

  return (
    <TouchableOpacity style={styles.card} onPress={() => openModal({ title, category, answers, audioFile })}>
      <View style={styles.cardTextContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.cardSubtitle}>Category: {props.category}</Text>
        <Text style={styles.cardSubtitle}>Answers: {props.answers}</Text>
      </View>
      <RightArrowIcon name="chevron-right" size={20} color="black" />
    </TouchableOpacity>
  );
};

const PopUpMenu = (props: { selectedEntry: any, modalVisible: any, closeModal: any }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={props.closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView 
            contentContainerStyle={styles.scrollContainer} 
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <Text style={styles.greeting}>{props.selectedEntry.title}</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet consectetur. In lorem pretium nec enim nisl urna. Justo arcu leo sed a sagittis non dictumst tellus.
            </Text>
            
            <JournalEntry audioFile={props.selectedEntry.audioFile[0]} />
            <JournalEntry audioFile={props.selectedEntry.audioFile[1]} />
            <JournalEntry audioFile={props.selectedEntry.audioFile[2]} />
            <TouchableOpacity style={styles.button} onPress={props.closeModal}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const JournalEntry = (props: { audioFile: any }) => {
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    const fetchAudioFile = async () => {
      try {
        const url = await Storage.get(props.audioFile, { level: 'public' });
        setAudioURL(url);
      } catch (error) {
        console.error('Error fetching audio file:', error);
      }
    };

    if (props.audioFile) fetchAudioFile();
  }, [props.audioFile]);

  const playAudio = async () => {
    try {
      if (!audioURL) {
        console.error('Audio URL is null.');
        return;
      }

      if (sound) {
        await sound.unloadAsync();
      }
      console.log("here");
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioURL });
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  return (
    <View style={styles.entrySection}>
      <Text style={styles.date}>Nov 28, 2023</Text>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="white"
          maximumTrackTintColor="#555555"
          thumbTintColor="white"
          value={0.5}
          onValueChange={(value) => console.log(value)}
        />
        <TouchableOpacity style={styles.playButton} onPress={playAudio}>
          <Ionicons name="play" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.keywordsContainer}>
        <View style={styles.keyword}><Text style={styles.keywordText}>keyword</Text></View>
        <View style={styles.keyword}><Text style={styles.keywordText}>keyword</Text></View>
        <View style={styles.keyword}><Text style={styles.keywordText}>keyword</Text></View>
      </View>
    </View>
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 15,
  },
  button: {
    backgroundColor: 'transparent',
    borderColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  archiveContainer: {
    flexDirection: 'column',
    width: '100%',
    padding: 10,
    marginTop: 20,
  },
  card: {
    backgroundColor: '#D3D3D3',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#444',
    marginBottom: 2,
  },
  cardIconContainer: {
    marginLeft: 10,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: '#AAAAAA',
  },
  description: {
    fontSize: 16,
    color: '#CCCCCC',
    marginBottom: 20,
  },
  entrySection: {
    borderTopWidth: 1,
    borderTopColor: '#444444',
    paddingTop: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  sliderContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  slider: {
    width: '90%',
    height: 40,
  },
  playButton: {
    backgroundColor: '#444444',
    borderRadius: 25,
    width: '10%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  keyword: {
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
  },
  keywordText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});

export default ArchiveScreen;