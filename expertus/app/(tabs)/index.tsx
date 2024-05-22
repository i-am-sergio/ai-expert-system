import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { ScreenContainer } from 'react-native-screens';
import CareerCard from '@/components/CareerCard';  // Asegúrate de tener la ruta correcta

interface Career {
  title: string;
  description: string;
}

const careers: Career[] = [
  { title: 'Ingeniería en Sistemas', description: 'Desarrollo y mantenimiento de sistemas informáticos.' },
  { title: 'Medicina', description: 'Diagnóstico y tratamiento de enfermedades.' },
  { title: 'Derecho', description: 'Asesoramiento y representación legal.' },
  { title: 'Arquitectura', description: 'Diseño y construcción de edificaciones.' },
  { title: 'Psicología', description: 'Estudio del comportamiento humano.' },
  { title: 'Marketing', description: 'Promoción y venta de productos y servicios.' },
  { title: 'Educación', description: 'Enseñanza y formación académica.' },
  { title: 'Diseño Gráfico', description: 'Creación de contenido visual.' },
  { title: 'Ingeniería Civil', description: 'Diseño y construcción de infraestructuras.' },
  { title: 'Biología', description: 'Estudio de los organismos vivos y sus interacciones.' },
  { title: 'Contabilidad', description: 'Gestión financiera y fiscal de empresas.' },
  { title: 'Nutrición', description: 'Estudio de la alimentación y su impacto en la salud.' },
  { title: 'Administración de Empresas', description: 'Gestión y dirección de organizaciones.' },
  { title: 'Periodismo', description: 'Investigación y difusión de noticias y eventos.' },
];

const HomeScreen: React.FC = () => {
  return (
    <ScreenContainer style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Bienvenido a Expertus</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Expertus es tu guía experta en orientación vocacional. Responde preguntas simples para descubrir las carreras universitarias que mejor se adaptan a ti.
          </Text>
        </View>
        <View style={styles.grid}>
          {careers.map((career, index) => (
            <CareerCard
              key={index}
              title={career.title}
              description={career.description}
            />
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  headerContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28, // Tamaño de la fuente
    fontWeight: 'bold', // Grosor de la fuente
    color: '#333', // Color del texto
    textAlign: 'center', // Alineación del texto
    marginTop: 20, // Espacio superior
    marginBottom: 10, // Espacio inferior
  },
  descriptionContainer: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
});

export default HomeScreen;
