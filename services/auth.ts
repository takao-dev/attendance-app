import * as SecureStore from 'expo-secure-store';
import { STORAGE_KEYS } from '../constants/config';

export async function saveCredentials(userId: string, password: string): Promise<void> {
  await SecureStore.setItemAsync(STORAGE_KEYS.userId, userId);
  await SecureStore.setItemAsync(STORAGE_KEYS.password, password);
}

export async function getCredentials(): Promise<{ userId: string; password: string } | null> {
  const userId = await SecureStore.getItemAsync(STORAGE_KEYS.userId);
  const password = await SecureStore.getItemAsync(STORAGE_KEYS.password);
  if (userId && password) {
    return { userId, password };
  }
  return null;
}

export async function deleteCredentials(): Promise<void> {
  await SecureStore.deleteItemAsync(STORAGE_KEYS.userId);
  await SecureStore.deleteItemAsync(STORAGE_KEYS.password);
}