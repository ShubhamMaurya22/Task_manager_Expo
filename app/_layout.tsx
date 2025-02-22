import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import {Provider} from 'react-redux'
import { store, persistor } from '@/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { mergeScreen } from '@/navigation/ScreenCollections';

export default function RootLayout() {
  
  return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
     <Stack
          initialRouteName='(tabs)'
          screenOptions={{
            headerShown: false
          }}
          >
            {mergeScreen.map((item,index) => {
                return (
                  <Stack.Screen 
                    key={index}
                    name={item}
                  />
                )
            })}
        </Stack>
        </PersistGate>
      </Provider>
  );
}
