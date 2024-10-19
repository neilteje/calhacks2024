import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
// Import audio playback functionality
import { Audio } from 'expo-av'; // Ensure to install expo-av if using Expo

const CalendarScreen = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD format
  const [selectedDay, setSelectedDay] = useState<string | null>(formattedDate);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const daysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

  const generateDaysArray = (year: number, month: number) => {
    const totalDays = daysInMonth(year, month);
    const daysArray = [];
    for (let day = 1; day <= totalDays; day++) {
      const formatted = `${year}-${(month + 1).toString().padStart(2, '0')}-${day
        .toString()
        .padStart(2, '0')}`;
      daysArray.push(formatted);
    }
    return daysArray;
  };

  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const daysArray = generateDaysArray(currentYear, currentMonth);

  const handleDayPress = (day: string) => {
    setSelectedDay(day);
    setIsPlaying(false)
  };

  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) setCurrentYear((prev) => prev - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) setCurrentYear((prev) => prev + 1);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const screenWidth = Dimensions.get('window').width;
  const buttonSize = screenWidth / 8 - 8; // Button size calculation to fit 7 columns

  // Function to play audio
  const playAudio = async () => {
    //const { sound } = await Audio.Sound.createAsync(
    //  require('./path/to/your/audio/file.mp3') // Replace with your audio file path
    //);
    //setSound(sound);
    //await sound.playAsync();
    setIsPlaying(!isPlaying);
    //sound.setOnPlaybackStatusUpdate((status) => {
      //if (status.didJustFinish) {
        //setIsPlaying(false);
      //}
    //});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePreviousMonth}>
          <Text style={styles.headerButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {`${monthNames[currentMonth]} ${currentYear}`}
        </Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Text style={styles.headerButton}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={daysArray}
        numColumns={7}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.dayButton,
              { width: buttonSize, height: buttonSize }, // Dynamically set size
              item === selectedDay ? styles.selectedDayButton : null,
            ]}
            onPress={() => handleDayPress(item)}
          >
            <Text
              style={[
                styles.dayText,
                item === selectedDay ? styles.selectedDayText : null,
              ]}
            >
              {item.split('-')[2]} {/* Display only the day */}
            </Text>
          </TouchableOpacity>
        )}
      />

      {selectedDay && (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            On {new Date(selectedDay).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}, you were very excited about receiving your first internship offer.
          </Text>
          <TouchableOpacity onPress={playAudio} style={styles.audioButton}>
            <Text style={styles.audioButtonText}>{isPlaying ? 'Playing...' : 'Audio Play'}</Text>
          </TouchableOpacity>
          <Text style={styles.transcribeText}>Transcribe of audio goes here.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerButton: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
  },
  dayButton: {
    margin: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#333',
  },
  selectedDayButton: {
    backgroundColor: 'white',
  },
  dayText: {
    color: 'white',
    fontSize: 16,
  },
  selectedDayText: {
    color: 'black',
    fontWeight: 'bold',
  },
  infoBox: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#222',
    borderRadius: 8,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 8,
  },
  audioButton: {
    padding: 8,
    backgroundColor: '#555',
    borderRadius: 4,
    alignItems: 'center',
    marginVertical: 8,
  },
  audioButtonText: {
    color: 'white',
    fontSize: 16,
  },
  transcribeText: {
    color: 'white',
    fontSize: 14,
  },
});

export default CalendarScreen;
