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
  let iconName: string = '';

  switch (route.name) {
    case 'Home':
      iconName = focused ? 'home' : 'home-outline';
      break;
    case 'Archive':
      iconName = focused ? 'albums' : 'albums-outline';
      break;
    case 'Profile':
      iconName = focused ? 'person' : 'person-outline';
      break;
    case 'Calendar':
      iconName = focused ? 'calendar' : 'calendar-outline';
      break;
    default:
      iconName = 'home-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

import { StatusBar } from 'react-native';

const App = (): React.JSX.Element => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer theme={DarkTheme}>
                <StatusBar barStyle="light-content" backgroundColor="#000" /> 
                <Tab.Navigator
                    initialRouteName="Home"
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => getTabBarIcon(route, focused, color, size),
                        tabBarActiveTintColor: '#FFF',
                        tabBarInactiveTintColor: '#888',
                        tabBarStyle: {
                            backgroundColor: '#000',
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                            overflow: 'hidden',
                            height: 60,
                            paddingBottom: 10,
                            borderTopWidth: 0, 
                        },
                        headerShown: false,
                    })}
                >
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="Archive" component={ArchiveScreen} />
                    <Tab.Screen name="Calendar" component={CalendarScreen} />
                    <Tab.Screen name="Profile" component={ProfileScreen} initialParams={{ user: 'Neil Teje', email: 'nteje2@illinois.edu' }} />
                </Tab.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
};

export default App;