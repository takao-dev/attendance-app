import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  status: 'success' | 'failure' | 'pending';
  className: string;
  roomNumber: string;
  semester?: string;
  date?: string;
};

const AttendanceStatus: React.FC<Props> = ({
  status,
  className,
  roomNumber,
  semester,
  date,
}) => {
  const getMessage = () => {
    switch (status) {
      case 'success':
        return `${className}（${roomNumber}）に出席しました ✅`;
      case 'failure':
        return `出席に失敗しました ❌`;
      case 'pending':
        return `出席処理中...`;
      default:
        return '';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return '#4CAF50'; // green
      case 'failure':
        return '#F44336'; // red
      case 'pending':
        return '#FFC107'; // amber
    }
  };

  return (
    <View style={[styles.container, { borderColor: getStatusColor() }]}>
      <Text style={[styles.message, { color: getStatusColor() }]}>
        {getMessage()}
      </Text>
      {semester && (
        <Text style={styles.subtext}>セメスター: {semester}</Text>
      )}
      {date && <Text style={styles.subtext}>日付: {date}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    margin: 16,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  message: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtext: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});

export default AttendanceStatus;