import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Modal, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const generateCalendarDates = (month: number, year: number) => {
  const dates: { day: number | null }[] = [];
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const adjustedFirstDay = (firstDay === 0 ? 6 : firstDay - 1);

  for (let i = 0; i < adjustedFirstDay; i++) {
    dates.push({ day: null });
  }

  for (let i = 1; i <= totalDays; i++) {
    dates.push({ day: i });
  }

  return dates;
};

const CalendarScreen = () => {
  const [month] = useState(new Date().getMonth());
  const [year] = useState(new Date().getFullYear());
  const dates = generateCalendarDates(month, year);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDateClick = (day: number | null) => {
    if (day) {
      setSelectedDate(day);
      setModalVisible(true);
    }
  };

  const renderJOLOPopup = () => {
    const mockPrompt = "What did you learn today?";
    const mockResponse = "I learned about implementing modals in React Native.";
    const mockKeywords = ["learning", "modals", "React Native"];

    return (
      <View style={styles.modalContent}>
        <Text style={styles.joloTitle}>JOLO for {selectedDate} {new Date(year, month).toLocaleString('default', { month: 'long' })} {2024}</Text>
        <Text style={styles.joloPrompt}>Prompt: {mockPrompt}</Text>
        <Text style={styles.joloResponse}>Response: {mockResponse}</Text>
        <Text style={styles.joloKeywords}>Keywords: {mockKeywords.join(", ")}</Text>
        <View style={styles.voiceRecording}>
          <Ionicons name="mic" size={24} color="#FFF" />
          <Text style={styles.voiceText}>Play Recording</Text>
        </View>
        <Button title="Close" onPress={() => setModalVisible(false)} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#FFF" />
        <Text style={styles.headerText}>{`${year}`}</Text>
        <Ionicons name="arrow-forward" size={24} color="#FFF" />
      </View>
      <View style={styles.centeredContent}>
        <Text style={styles.monthTitle}>{new Date(year, month).toLocaleString('default', { month: 'long' })} {year}</Text>
        <View style={styles.daysOfWeekContainer}>
          {daysOfWeek.map((day, index) => (
            <Text key={index} style={styles.dayOfWeek}>{day}</Text>
          ))}
        </View>
        <View style={styles.calendarGrid}>
          {dates.map((date, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.dateBox, date.day === new Date().getDate() ? styles.currentDate : null]}
              onPress={() => handleDateClick(date.day)}
            >
              {date.day ? <Text style={styles.dateText}>{date.day}</Text> : null}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          {renderJOLOPopup()}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center', // Center the calendar
  },
  headerText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  monthTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  daysOfWeekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  dayOfWeek: {
    color: '#AAA',
    fontSize: 14,
    width: `${100 / 7}%`,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 2,
    paddingHorizontal: 5,
  },
  dateBox: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dateText: {
    color: '#FFF',
    fontSize: 14,
  },
  currentDate: {
    backgroundColor: '#FFF',
    borderColor: '#FFF',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  joloTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  joloPrompt: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 5,
  },
  joloResponse: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 5,
  },
  joloKeywords: {
    color: '#FFF',
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 15,
  },
  voiceRecording: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    borderRadius: 20,
    marginBottom: 15,
  },
  voiceText: {
    color: '#FFF',
    fontSize: 14,
    marginLeft: 10,
  },
});

export default CalendarScreen;
