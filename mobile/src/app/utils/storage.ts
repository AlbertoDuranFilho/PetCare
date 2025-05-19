import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Pet } from '../types';

export const saveUser = async (user: User): Promise<void> => {
  await AsyncStorage.setItem('user', JSON.stringify(user));
};

export const getUser = async (): Promise<User | null> => {
  const user = await AsyncStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const savePets = async (pets: Pet[]): Promise<void> => {
  await AsyncStorage.setItem('pets', JSON.stringify(pets));
};

export const getPets = async (): Promise<Pet[]> => {
  const pets = await AsyncStorage.getItem('pets');
  return pets ? JSON.parse(pets) : [];
};

export const logout = async (): Promise<void> => {
  await AsyncStorage.removeItem('user');
};