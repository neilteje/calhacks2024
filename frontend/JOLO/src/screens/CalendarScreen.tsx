import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Helper function to get the days of a given month
const getDaysInMonth = (month: number, year: number) => {
  const days = [];
  const totalDays = new Date(year, month + 1, 0).getDate(); // Get last day of the month

  for (let day = 1; day <= totalDays; day++) {
    days.push({ key: `${year}-${month}-${day}`, day });
  }

  return days;
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date()); // Track current date
  const [days, setDays] = useState([]);

  // Update the days in the month whenever the month changes
  useEffect(() => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    setDays(getDaysInMonth(month, year));
  }, [currentDate]);

  // Handle month navigation
  const changeMonth = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  return (
    <View style={styles.container}>
      {/* Month Navigation */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Ionicons name="chevron-back" size={24} color="#FFF" />
        </TouchableOpacity>

        <Text style={styles.headerText}>
          {currentDate.toLocaleString('default', { month: 'long' })}{' '}
          {currentDate.getFullYear()}
        </Text>

        <TouchableOpacity onPress={() => changeMonth(1)}>
          <Ionicons name="chevron-forward" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Calendar Days */}
      <FlatList
        data={days}
        numColumns={7} // 7 columns for each day of the week
        renderItem={({ item }) => (
          <View style={styles.dayContainer}>
            <Text style={styles.dayText}>{item.day}</Text>
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

// Get the dimensions of the screen to adjust styles
const { width } = Dimensions.get('window');
const daySize = width / 7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background
    paddingTop: 40,
    marginBottom: 30
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  headerText: {
    color: '#FFF', // White text
    fontSize: 20,
    fontWeight: 'bold',
  },
  dayContainer: {
    width: daySize, // Equal size for each day
    height: daySize,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    color: '#FFF', // White text
    fontSize: 16,
  },
});

export default Calendar;
