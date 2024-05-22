import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

interface Career {
  title: string;
  link: string;
}

interface UniversityCardProps {
  name: string;
  careers: Career[];
  onPress: (career: Career) => void;
}

const UniversityCard: React.FC<UniversityCardProps> = ({ name, careers, onPress }) => {

  const handleCareerPress = (link: string) => {
    Linking.openURL(link); 
  };

  return (
    <View style={styles.card}>
      <Text style={styles.universityName}>{name}</Text>
      {careers.map((career, index) => (
        <TouchableOpacity key={index} style={styles.careerItem} onPress={() => onPress(career)}>
          <Text style={styles.careerTitle}>{career.title}</Text>
          <TouchableOpacity onPress={() => handleCareerPress(career.link)}>
            <Text style={styles.careerDescription}>{career.link}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    minWidth: '95%',
    maxWidth: '95%',
  },
  universityName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    maxWidth: '100%', // Esto asegura que el texto no exceda el ancho del contenedor
  },
  careerItem: {
    marginVertical: 4,
  },
  careerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  careerDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default UniversityCard;
