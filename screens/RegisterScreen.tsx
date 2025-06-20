import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import { registerClass } from '../services/api';
import * as SecureStore from 'expo-secure-store';
import { v4 as uuidv4 } from 'uuid';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export default function RegisterScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [className, setClassName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [startTime, setStartTime] = useState('');
  const [semester, setSemester] = useState('1S');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const loadUserId = async () => {
      const id = await SecureStore.getItemAsync('userId');
      if (id) setUserId(id);
    };
    loadUserId();
  }, []);

  const handleRegister = async () => {
    if (!className || !roomNumber || !dayOfWeek || !startTime || !semester) {
      Alert.alert('エラー', 'すべての項目を入力してください。');
      return;
    }

    const newClass = {
      id: uuidv4(),
      userId,
      className,
      roomNumber,
      dayOfWeek,
      startTime,
      semester,
    };

    try {
      await registerClass(newClass);
      Alert.alert('登録完了', `${className}（${roomNumber}）を登録しました。`);
      navigation.goBack();
    } catch (error) {
      Alert.alert('エラー', '登録に失敗しました。');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>授業名</Text>
      <TextInput
        style={styles.input}
        placeholder="例：ネットワーク応用"
        value={className}
        onChangeText={setClassName}
      />

      <Text style={styles.label}>教室番号</Text>
      <TextInput
        style={styles.input}
        placeholder="例：302"
        value={roomNumber}
        onChangeText={setRoomNumber}
      />

      <Text style={styles.label}>曜日</Text>
      <TextInput
        style={styles.input}
        placeholder="例：水曜日"
        value={dayOfWeek}
        onChangeText={setDayOfWeek}
      />

      <Text style={styles.label}>開始時刻</Text>
      <TextInput
        style={styles.input}
        placeholder="例：10:30"
        value={startTime}
        onChangeText={setStartTime}
      />

      <Text style={styles.label}>セメスター</Text>
      <Picker
        selectedValue={semester}
        onValueChange={(value) => setSemester(value)}
        style={styles.input}
      >
        <Picker.Item label="1S" value="1S" />
        <Picker.Item label="2S" value="2S" />
      </Picker>

      <View style={styles.buttonContainer}>
        <Button title="登録する" onPress={handleRegister} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
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