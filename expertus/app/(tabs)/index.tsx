import { StyleSheet, Text, View, ScrollView } from "react-native";
import CareerCard from "@/components/CareerCard";
import axios from "axios";
import { useEffect, useState } from "react";

interface Career {
  title: string;
}

export default function HomeScreen() {
  const [careers, setCareers] = useState<Career[]>([]);

  useEffect(() => {
    axios
      .get(
        "https://ai-expert-system-vocational-guidance-gbod.onrender.com/course"
      )
      .then((response) => {
        const data = response.data.map((title: string) => ({ title }));
        setCareers(data);
      })
      .catch((error) => {
        console.error("Error fetching careers:", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Bienvenido a Expertus</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Expertus es tu guía experta en orientación vocacional. Responde
            preguntas simples para descubrir las carreras universitarias que
            mejor se adaptan a ti.
          </Text>
        </View>
        <View style={styles.grid}>
          {careers.map((career, index) => (
            <CareerCard key={index} title={career.title} description="" />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollViewContent: {
    alignItems: "center",
    paddingVertical: 16,
  },
  headerContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28, // Tamaño de la fuente
    fontWeight: "bold", // Grosor de la fuente
    color: "#333", // Color del texto
    textAlign: "center", // Alineación del texto
    marginTop: 20, // Espacio superior
    marginBottom: 10, // Espacio inferior
  },
  descriptionContainer: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 8,
  },
});
