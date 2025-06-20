import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/config';

type AttendanceRecord = {
  classId: string;
  date: string; // 例: '2025-06-20'
  status: 0 | 1; // 0: 欠席, 1: 出席
};

// 当日の出席を保存
export async function saveTodayAttendance(record: AttendanceRecord): Promise<void> {
  const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
  const key = `${STORAGE_KEYS.todayAttendance}:${today}`;
  const existing = await AsyncStorage.getItem(key);
  const data: AttendanceRecord[] = existing ? JSON.parse(existing) : [];
  const updated = [...data.filter(r => r.classId !== record.classId), record];
  await AsyncStorage.setItem(key, JSON.stringify(updated));
}

// 当日の出席を取得
export async function getTodayAttendance(): Promise<AttendanceRecord[]> {
  const today = new Date().toISOString().split('T')[0];
  const key = `${STORAGE_KEYS.todayAttendance}:${today}`;
  const data = await AsyncStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

// 古い出席データを削除（前日以前）
export async function clearOldAttendance(): Promise<void> {
  const keys = await AsyncStorage.getAllKeys();
  const today = new Date().toISOString().split('T')[0];
  const pattern = `${STORAGE_KEYS.todayAttendance}:`;

  const oldKeys = keys.filter(
    (key) => key.startsWith(pattern) && !key.endsWith(today)
  );

  await AsyncStorage.multiRemove(oldKeys);
}