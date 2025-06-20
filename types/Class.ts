export type ClassData = {
  id: string;              // UUIDなどで一意に識別
  userId: string;          // 所有ユーザーのID
  className: string;       // 授業名（例：ネットワーク応用）
  roomNumber: string;      // 教室番号（例：302）
  dayOfWeek: string;       // 曜日（例：火曜日）
  startTime: string;       // 開始時刻（例：10:30）
  semester: '1S' | '2S';   // セメスター（1Sまたは2S）
};