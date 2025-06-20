import { ATTENDANCE_ENDPOINTS } from '../constants/config';
import { ClassData } from '../types/Class';

// 授業を登録する（POST /classes）
export async function registerClass(data: ClassData): Promise<void> {
  const res = await fetch(ATTENDANCE_ENDPOINTS.registerClass, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('授業登録に失敗しました');
  }
}

// セメスターとユーザーIDで授業を取得（GET /classes?semester=1S&userId=xxx）
export async function fetchClasses(
  semester: string,
  userId: string
): Promise<ClassData[]> {
  const res = await fetch(ATTENDANCE_ENDPOINTS.getClasses(semester, userId));
  if (!res.ok) {
    throw new Error('授業取得に失敗しました');
  }
  return res.json();
}

// 出席履歴を取得（GET /attendance/history?userId=xxx）
export async function fetchAttendanceHistory(userId: string): Promise<any[]> {
  const res = await fetch(ATTENDANCE_ENDPOINTS.getAttendanceHistory(userId));
  if (!res.ok) {
    throw new Error('出席履歴の取得に失敗しました');
  }
  return res.json();
}

// 出席を送信（POST /attendance/submit）
export async function submitAttendance(payload: {
  userId: string;
  classId: string;
  date: string;
  status: 0 | 1;
}): Promise<void> {
  const res = await fetch(ATTENDANCE_ENDPOINTS.submitAttendance, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('出席送信に失敗しました');
  }
}