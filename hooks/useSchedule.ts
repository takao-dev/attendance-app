import { useEffect, useState } from 'react';
import { ClassData } from '../types/Class';
import { getTodayClasses } from '../storage/localAttendance';
import { getCurrentDayOfWeek, isTimeWithinRange } from '../utils/time';

export function useSchedule() {
  const [currentClass, setCurrentClass] = useState<ClassData | null>(null);
  const [todayClasses, setTodayClasses] = useState<ClassData[]>([]);

  useEffect(() => {
    const loadTodaySchedule = async () => {
      const all = await getTodayClasses(); // AsyncStorageなどから取得
      const today = getCurrentDayOfWeek(); // 例: "火曜日"
      const filtered = all.filter((cls) => cls.dayOfWeek === today);
      setTodayClasses(filtered);

      const now = new Date();
      const match = filtered.find((cls) =>
        isTimeWithinRange(cls.startTime, now)
      );
      setCurrentClass(match || null);
    };

    loadTodaySchedule();
  }, []);

  return { currentClass, todayClasses };
}