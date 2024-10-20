import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Modal, Button, ScrollView, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { createClient } from '@deepgram/sdk';

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

const fetchDeepgramSummary = async (audioUrl) => {
  try {
    const deepgramApiKey = process.env.DEEPGRAM_API_KEY;
    const deepgram = createClient(deepgramApiKey);

    const { result, error } = await deepgram.transcription.preRecorded({
      url: audioUrl,
    }, {
      punctuate: true,
      smart_format: true,
      summarize: true,
      paragraphs: true,
      utterances: true,
      keywords: ['happy', 'sad', 'excited'],
      diarize: true,
      sentiment: true,
      language: 'en',
    });

    if (error) {
      console.error("Deepgram API Error:", error);
      return null;
    }

    // Extract summary or transcription details
    const summary = result.results.summary.text;
    const transcript = result.results.transcripts[0]?.text || "No transcript available.";
    const sentiment = result.results.sentiment.average;

    return { summary, transcript, sentiment };
  } catch (error) {
    console.error("Error during Deepgram Summarization:", error);
    return null;
  }
};

const CalendarScreen = () => {
  const [month] = useState(new Date().getMonth());
  const [year] = useState(new Date().getFullYear());
  const dates = generateCalendarDates(month, year);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [dailyPrompt, setDailyPrompt] = useState('');
  const [transcription, setTranscription] = useState('');
  const [summary, setSummary] = useState('');
  const [sentiment, setSentiment] = useState('');

  const fetchDailyPrompt = useCallback(async (day: number) => {
    try {
      const response = await axios.get('http://localhost:5001/api/questions');
      const selectedDateString = new Date(year, month, day).toISOString().split('T')[0];
      const questionForDay = response.data.find(
        (q: any) => new Date(q.createdAt).toISOString().split('T')[0] === selectedDateString
      );

      if (questionForDay) {
        setDailyPrompt(questionForDay.text);

        // Fetch transcription and summary using Deepgram (Mocked example)
        const audioUrl = 'https://example.com/user-private-audio.mp3';
        const deepgramResponse = await fetchDeepgramSummary(audioUrl);

        if (deepgramResponse) {
          setSummary(deepgramResponse.summary);
          setTranscription(deepgramResponse.transcript);
          setSentiment(`Sentiment: ${deepgramResponse.sentiment > 0 ? 'Positive' : 'Negative'}`);
        }
      } else {
        setDailyPrompt("No prompt available for this date.");
        setTranscription("");
        setSummary("");
      }

      setModalVisible(true);
    } catch (error) {
      console.error("Error fetching prompt:", error);
      setDailyPrompt("Unable to fetch prompt.");
      setModalVisible(true);
    }
  }, [month, year]);

  useEffect(() => {
    if (selectedDate) {
      fetchDailyPrompt(selectedDate);
    }
  }, [selectedDate, fetchDailyPrompt]);

  const handleDateClick = (day: number | null) => {
    if (day) {
      setSelectedDate(day);
    }
  };

  const renderJOLOPopup = () => {
    return (
      <View style={styles.modalContent}>
        <Text style={styles.joloTitle}>JOLO for {selectedDate} {new Date(year, month).toLocaleString('default', { month: 'long' })} {year}</Text>
        <Text style={styles.joloPrompt}>Prompt: {dailyPrompt}</Text>
        {summary && <Text style={styles.joloSummary}>Summary: {summary}</Text>}
        {transcription && (
          <>
            <Text style={styles.joloTranscription}>Transcript: {transcription}</Text>
            <Text style={styles.joloSentiment}>{sentiment}</Text>
            <View style={styles.voiceRecording}>
              <Ionicons name="mic" size={24} color="#FFF" />
              <Text style={styles.voiceText}>Play Recording</Text>
            </View>
          </>
        )}
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
  joloSummary: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  joloTranscription: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  joloSentiment: {
    color: '#FFF',
    fontSize: 14,
    marginBottom: 5,
  },
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
    justifyContent: 'center',
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
