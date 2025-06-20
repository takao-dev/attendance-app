import AsyncStorage from '@react-native-async-storage/async-storage';
import { ClassData } from '../types/Class';
import { STORAGE_KEYS } from '../constants/config';

// 保存キーの生成（セメスター＋日付）
function getStorageKey(semester: string, date: string): string {
  return `${STORAGE_KEYS.todayAttendance}:${semester}:${date}`;
}

// 当日分の授業を保存
export async function saveTodayClasses(
  semester: string,
  date: string,
  classes: ClassData[]
): Promise<void> {
  const key = getStorageKey(semester, date);
  await AsyncStorage.setItem(key, JSON.stringify(classes));
}

// 当日分の授業を取得
export async function getTodayClasses(): Promise<ClassData[]> {
  const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
  const semester = await AsyncStorage.getItem(STORAGE_KEYS.currentSemester);
  if (!semester) return [];

  const key = getStorageKey(semester, today);
  const data = await AsyncStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

// 古い日付の授業データを削除
export async function clearOldClasses(): Promise<void> {
  const keys = await AsyncStorage.getAllKeys();
  const today = new Date().toISOString().split('T')[0];
  const pattern = `${STORAGE_KEYS.todayAttendance}:`;

  const oldKeys = keys.filter(
    (key) => key.startsWith(pattern) && !key.includes(today)
  );

  await AsyncStorage.multiRemove(oldKeys);
}