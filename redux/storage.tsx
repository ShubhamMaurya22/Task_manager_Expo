import AsyncStorage from '@react-native-async-storage/async-storage';
import { Storage } from 'redux-persist';


const reduxStorage: Storage = {
  setItem: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  getItem: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return Promise.resolve(value);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default reduxStorage;
