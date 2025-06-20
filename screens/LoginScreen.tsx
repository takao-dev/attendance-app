import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import { useUser } from '../contexts/UserContext';
import { STORAGE_KEYS } from '../constants/config';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { setUser } = useUser();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!userId || !password) {
      Alert.alert('エラー', 'ログインIDとパスワードを入力してください。');
      return;
    }

    try {
      await SecureStore.setItemAsync(STORAGE_KEYS.userId, userId);
      await SecureStore.setItemAsync(STORAGE_KEYS.password, password);
      setUser({ userId });
      Alert.alert('ログイン完了', 'ログイン情報を保存しました。');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('保存エラー', 'ログイン情報の保存に失敗しました。');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ログインID</Text>
      <TextInput
        style={styles.input}
        placeholder="例：student123"
        value={userId}
        onChangeText={setUserId}
        autoCapitalize="none"
      />

      <Text style={styles.label}>パスワード</Text>
      <TextInput
        style={styles.input}
        placeholder="パスワード"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.buttonContainer}>
        <Button title="ログイン情報を保存" onPress={handleLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
  },
  buttonContainer: {
    marginTop: 24,
  },
});