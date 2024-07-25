import React, { useEffect } from 'react';
import { StatusBar, Alert } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import { AuthenticationProvider } from './src/contexts/authentication';
import { ContentProvider } from './src/contexts/content';
import RootNavigator from './src/navigators/root';
import theme from './src/styles/theme';
import { messaging as firebaseMessaging } from './src/firebaseConfig'; // Assurez-vous que ce chemin est correct

const App = () => {
  async function requestUserPermission() {
    try {
      const authStatus = await firebaseMessaging.requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      } else {
        console.log('Notification permission not granted');
      }
    } catch (error) {
      console.error('Permission request failed:', error);
    }
  }

  const getToken = async () => {
    try {
      const token = await firebaseMessaging.getToken();
      console.log('Token =', token);
    } catch (error) {
      console.error('Failed to get token:', error);
    }
  }

  useEffect(() => {
    requestUserPermission();
    getToken();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <AuthenticationProvider>
        <ContentProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </ContentProvider>
      </AuthenticationProvider>
      <StatusBar backgroundColor="#faf8fe" barStyle="dark-content" />
    </PaperProvider>
  );
};

export default App;
