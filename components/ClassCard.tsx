import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export type ClassData = {
  id: string;
  className: string;
  roomNumber: string;
  dayOfWeek: string;
  startTime: string;
  semester: string;
  onPress: () => void;
};

const ClassCard: React.FC<ClassData> = ({
  className,
  roomNumber,
  dayOfWeek,
  startTime,
  semester,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View>
        <Text style={styles.className}>{className}</Text>
        <Text style={styles.detail}>教室番号: {roomNumber}</Text>
        <Text style={styles.detail}>
          {dayOfWeek}・{startTime} 開始
        </Text>
        <Text style={styles.semester}>セメスター: {semester}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  className: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detail: {
    fontSize: 14,
    color: '#555',
  },
  semester: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
});

export default ClassCard;