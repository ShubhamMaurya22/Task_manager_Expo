import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import {Provider} from 'react-redux'
import { store, persistor } from '@/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function RootLayout() {
  
  return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
     <Stack
          initialRouteName='index'
          screenOptions={{
            headerShown: false
          }}
          >
            <Stack.Screen 
              name='index'
              options={{}}
              />
            <Stack.Screen 
              name='AddTask'
              options={{}}
              />
            <Stack.Screen 
              name='UpdateTask'
              options={{}}
              />
        </Stack>
        </PersistGate>
      </Provider>
  );
}
