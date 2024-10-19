import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import ArchiveScreen from './src/screens/ArchiveScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (route: any, focused: boolean, color: string, size: number) => {
  let iconName = 'home-outline';

  if (route.name === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === 'Archive') {
    iconName = focused ? 'albums' : 'albums-outline';
  } else if (route.name === 'Profile') {
    iconName = focused ? 'person' : 'person-outline';
  } else if (route.name === 'Calendar') {
    iconName = focused ? 'calendar' : 'calendar-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

const App = (): React.JSX.Element => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={DarkTheme}>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => getTabBarIcon(route, focused, color, size),
            tabBarActiveTintColor: '#FFF',
            tabBarInactiveTintColor: '#888',
            tabBarStyle: {
              backgroundColor: '#000', // Set the background to black
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              overflow: 'hidden',
              height: 60, // Adjust the height if needed
              paddingBottom: 10, // Adjust padding for better icon alignment
            },
            headerStyle: {
              backgroundColor: '#000', // Dark mode for header
              elevation: 0, // Remove elevation shadow
              shadowOpacity: 0,
            },
            headerTitleStyle: {
              color: '#FFF',
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Archive" component={ArchiveScreen} />
          <Tab.Screen name="Calendar" component={CalendarScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;