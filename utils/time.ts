// 曜日を日本語で返す（例: "火曜日"）
export function getCurrentDayOfWeek(): string {
  const days = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
  return days[new Date().getDay()];
}

// 時刻文字列（"10:30"）が現在時刻と一致するか、範囲内かを判定
export function isTimeWithinRange(start: string, now: Date = new Date(), rangeMinutes = 15): boolean {
  const [hour, minute] = start.split(':').map(Number);
  const startTime = new Date(now);
  startTime.setHours(hour, minute, 0, 0);

  const endTime = new Date(startTime);
  endTime.setMinutes(endTime.getMinutes() + rangeMinutes);

  return now >= startTime && now <= endTime;
}

// 現在の日付を "YYYY-MM-DD" 形式で返す
export function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

// 任意の日付文字列（"2025-06-20"）が今日かどうかを判定
export function isToday(dateStr: string): boolean {
  return dateStr === getTodayDate();
}