import { ATTENDANCE_ENDPOINTS } from '../constants/config';

export type AttendanceHistory = {
  id: string;
  userId: string;
  classId: string;
  className: string;
  roomNumber: string;
  semester: string;
  date: string; // 例: '2025-06-20'
  status: 0 | 1; // 0: 欠席, 1: 出席
};

// 出席履歴を取得（GET /attendance/history?userId=xxx）
export async function fetchAttendanceHistory(userId: string): Promise<AttendanceHistory[]> {
  const res = await fetch(ATTENDANCE_ENDPOINTS.getAttendanceHistory(userId));
  if (!res.ok) {
    throw new Error('出席履歴の取得に失敗しました');
  }
  return res.json();
}

// セメスター指定で履歴を取得（GET /attendance/history?userId=xxx&semester=1S）
export async function fetchAttendanceBySemester(
  userId: string,
  semester: string
): Promise<AttendanceHistory[]> {
  const url = `${ATTENDANCE_ENDPOINTS.getAttendanceHistory(userId)}&semester=${semester}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('セメスター別の出席履歴取得に失敗しました');
  }
  return res.json();
}