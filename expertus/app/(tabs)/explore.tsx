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
      { title: 'Ingeniería Civil', link: 'https://fic.unsa.edu.pe/ingcivil/plan-de-estudios/'},
      { title: 'Medicina', link: 'https://fmd.unsa.edu.pe/plan-de-estudios/' },
      { title: 'Enfermería', link: 'https://fen.unsa.edu.pe/plan-de-estudios-2/'},
      { title: 'Derecho', link: 'https://fde.unsa.edu.pe/blog/categorias_cur/2017/' },
      { title: 'Arquitectura', link: 'https://fau.unsa.edu.pe/plan-de-estudios/' },
      { title: 'Psicología', link: 'https://fpsrriicc.unsa.edu.pe/psicologia/plan-de-estudios-2/' },
      { title: 'Marketing', link: 'https://fad.unsa.edu.pe/marketing/plan-de-estudios/' },
      { title: 'Educación', link: 'https://fce.unsa.edu.pe/plan-de-estudios-2/' },
      { title: 'Ingeniería en Sistemas', link: 'https://fips.unsa.edu.pe/ingenieriadesistemas/' },
      { title: 'Ciencias de la Computación', link: 'https://fips.unsa.edu.pe/cienciadelacomputacion/plan-de-estudios/' },
    ],
  },
  {
    name: 'Universidad Tecnológica del Peru',
    careers: [
      { title: 'Ingeniería Electrónica', link: 'https://www.utp.edu.pe/pregrado/facultad-de-ingenieria/ingenieria-electronica' },
      { title: 'Ingeniería en Software', link: 'https://www.utp.edu.pe/pregrado/facultad-de-ingenieria/ingenieria-de-software' },
      { title: 'Ingeniería Civil', link: 'https://www.utp.edu.pe/pregrado/facultad-de-ingenieria/ingenieria-civil' },
      { title: 'Ingeniería Industrial', link: 'https://www.utp.edu.pe/pregrado/facultad-de-ingenieria/ingenieria-industrial' },
      { title: 'Ingeniería Ambiental', link: 'https://www.utp.edu.pe/pregrado/facultad-de-ingenieria/ingenieria-ambiental' },
      { title: 'Ingeniería Mecánica', link: 'https://www.utp.edu.pe/pregrado/facultad-de-ingenieria/ingenieria-mecanica' },
    ],
  },
  {
    name: 'Universidad Nacional de Ingenieria',
    careers: [
      { title: 'Ingeniería Civil', link: 'https://acreditacion.uni.edu.pe/es/civil/curriculum/' },
      { title: 'Ingeniería Mecánica', link: 'https://acreditacion.uni.edu.pe/es/mechanical/curriculum/' },
      { title: 'Ingeniería Química', link: 'https://acreditacion.uni.edu.pe/es/chemical/curriculum/' },
      { title: 'Ingeniería Eléctrica', link: 'https://fiee.uni.edu.pe/es/ingenieria_electrica' },
      { title: 'Ingeniería de Minas', link: 'https://acreditacion.uni.edu.pe/es/mining/curriculu/' },
    ],
  },
  {
    name: 'Universidad San Martin de Porres',
    careers: [
      { title: 'Administración de Empresas', link: 'https://www.administracion.usmp.edu.pe/administracion/silabos/' },
      { title: 'Contabilidad', link: 'https://usmp.edu.pe/fccef/pregrado/escuela-profesional-de-contabilidad-y-finanzas/plan-de-estudios-2023-contabilidad/' },
      { title: 'Ingeniería de Telecomunicaciones', link: 'https://fcctp.usmp.edu.pe/site/programas-academicos/pregrado/comunicaciones/malla-curricular/' },
      { title: 'Ingeniería de Computacion y Sistemas', link: 'https://filialsur.usmp.edu.pe/ingenieria-de-computacion-y-sistemas/' },
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
    marginTop: 24,
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
    color: '#8948c7',
  },
});

export default ExploreScreen;
