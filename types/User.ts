export type User = {
  userId: string;         // 学内IDやログインIDなど
  username?: string;      // 表示名（任意）
  email?: string;         // メールアドレス（必要に応じて）
  role?: 'student' | 'admin'; // 権限（将来的な拡張用）
};