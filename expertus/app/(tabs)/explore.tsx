import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import UniversityCard from '@/components/UniversityCard'; // Asegúrate de tener la ruta correcta

interface Career {
  title: string;
  link: string;
}

interface University {
  name: string;
  careers: Career[];
}

const universities: University[] = [
  {
    name: 'Universidad Nacional de San Agustin',
    careers: [
      { title: 'Ingeniería en Sistemas', link: 'https://www.unsa.edu.pe/' },
      { title: 'Medicina', link: 'https://www.unsa.edu.pe/' },
      { title: 'Derecho', link: 'https://www.unsa.edu.pe/' },
      { title: 'Arquitectura', link: 'https://www.unsa.edu.pe/' },
      { title: 'Psicología', link: 'https://www.unsa.edu.pe/' },
      { title: 'Marketing', link: 'https://www.unsa.edu.pe/' },
      { title: 'Educación', link: 'https://www.unsa.edu.pe/' },
    ],
  },
  {
    name: 'Universidad Tecnológica del Peru',
    careers: [
      { title: 'Ingeniería en Software', link: 'https://www.utp.edu.pe/' },
      { title: 'Ciencias de la Computación', link: 'https://www.utp.edu.pe/' },
      { title: 'Ingeniería Electrónica', link: 'https://www.utp.edu.pe/' },
      { title: 'Matemáticas Aplicadas', link: 'https://www.utp.edu.pe/' },
      { title: 'Ingeniería Civil', link: 'https://www.utp.edu.pe/' },
      { title: 'Ingeniería Industrial', link: 'https://www.utp.edu.pe/' },
      { title: 'Ciberseguridad', link: 'https://www.utp.edu.pe/' },
      { title: 'Ingeniería Ambiental', link: 'https://www.utp.edu.pe/' },
    ],
  },
  {
    name: 'Universidad Nacional de Ingenieria',
    careers: [
      { title: 'Ingeniería Civil', link: 'https://www.uni.edu.pe/' },
      { title: 'Ingeniería Mecánica', link: 'https://www.uni.edu.pe/' },
      { title: 'Ingeniería Eléctrica', link: 'https://www.uni.edu.pe/' },
      { title: 'Ingeniería Química', link: 'https://www.uni.edu.pe/' },
      { title: 'Ingeniería de Minas', link: 'https://www.uni.edu.pe/' },
    ],
  },
  {
    name: 'Universidad San Martin de Porres',
    careers: [
      { title: 'Administración de Empresas', link: 'https://www.usmp.edu.pe/' },
      { title: 'Contabilidad', link: 'https://www.usmp.edu.pe/' },
      { title: 'Ingeniería de Telecomunicaciones', link: 'https://www.usmp.edu.pe/' },
      { title: 'Diseño Gráfico', link: 'https://www.usmp.edu.pe/' },
      { title: 'Terapia Física', link: 'https://www.usmp.edu.pe/' },
    ],
  }
];

const ExploreScreen: React.FC = () => {
  const handleCareerPress = (career: Career) => {
    console.log(`Navigating to details of ${career.title}`);
    // Aquí podrías navegar a una pantalla de detalles de la carrera
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Explorar Universidades</Text>
        </View>
        {universities.map((university, index) => (
          <UniversityCard
            key={index}
            name={university.name}
            careers={university.careers}
            onPress={handleCareerPress}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  headerContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ExploreScreen;
