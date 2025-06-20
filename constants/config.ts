export const API_BASE_URL = 'https://attendance-api.takao.me'; // ← 実際のAPIエンドポイントに置き換えてください

export const ATTENDANCE_ENDPOINTS = {
  registerClass: `${API_BASE_URL}/classes`,
  getClasses: (semester: string, userId: string) =>
    `${API_BASE_URL}/classes?semester=${semester}&userId=${userId}`,
  getAttendanceHistory: (userId: string) =>
    `${API_BASE_URL}/attendance/history?userId=${userId}`,
  submitAttendance: `${API_BASE_URL}/attendance/submit`,
};

export const STORAGE_KEYS = {
  userId: 'userId',
  password: 'password',
  todayAttendance: 'todayAttendance',
};

export const SEMESTERS = ['1S', '2S'];

export const DAYS_OF_WEEK = [
  '月曜日',
  '火曜日',
  '水曜日',
  '木曜日',
  '金曜日',
  '土曜日',
  '日曜日',
];