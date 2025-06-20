import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Button,
  Alert,
} from 'react-native';
import ClassCard from '../components/ClassCard';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import { fetchClasses } from '../services/api';
import * as SecureStore from 'expo-secure-store';
import { Picker } from '@react-native-picker/picker';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type ClassData = {
  id: string;
  className: string;
  roomNumber: string;
  dayOfWeek: string;
  startTime: string;
  semester: string;
};

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [semester, setSemester] = useState<'1S' | '2S'>('1S');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const loadUserId = async () => {
      const id = await SecureStore.getItemAsync('userId');
      if (id) {
        setUserId(id);
        loadClasses(id, semester);
      }
    };
    loadUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      loadClasses(userId, semester);
    }
  }, [semester]);

  const loadClasses = async (uid: string, sem: string) => {
    try {
      const data = await fetchClasses(sem, uid);
      setClasses(data);
    } catch (error) {
      Alert.alert('エラー', '授業の取得に失敗しました。');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>セメスター選択</Text>
      <Picker
        selectedValue={semester}
        onValueChange={(value) => setSemester(value)}
        style={styles.picker}
      >
        <Picker.Item label="1S" value="1S" />
        <Picker.Item label="2S" value="2S" />
      </Picker>

      <Text style={styles.title}>登録済みの授業</Text>
      <FlatList
        data={classes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClassCard
            id={item.id}
            className={item.className}
            roomNumber={item.roomNumber}
            dayOfWeek={item.dayOfWeek}
            startTime={item.startTime}
            onPress={() =>
              navigation.navigate('WebAttendance', {
                roomNumber: item.roomNumber,
              })
            }
          />
        )}
      />

      <View style={styles.buttonArea}>
        <Button
          title="授業を登録する"
          onPress={() => navigation.navigate('Register')}
        />
        <Button
          title="設定"
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  picker: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  buttonArea: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
});