import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ListRenderItem,
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import axios from "axios";

// Definimos los tipos para los mensajes
type Message = {
  type: "question" | "answer" | "diagnostico";
  text: string;
};

function ChatBoxArea() {
  const insets = useSafeAreaInsets();
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Obtener la pregunta inicial
    //http://127.0.0.1:5000/pregunta
    axios
      .get("https://hq3n9719-5000.brs.devtunnels.ms/pregunta")
      .then((res) => {
        if (res.data.pregunta) {
          setMessages([{ type: "question", text: res.data.pregunta }]);
        }
      });
  }, []);

  const handleSend = () => {
    console.log("Mensaje enviado:", text);
    // Añadir la respuesta del usuario a los mensajes
    setMessages((prevMessages) => [...prevMessages, { type: "answer", text }]);
    //http://127.0.0.1:5000/respuesta
    axios
      .post("https://hq3n9719-5000.brs.devtunnels.ms/respuesta", {
        respuesta: text,
      })
      .then((res) => {
        if (res.data.pregunta) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { type: "question", text: res.data.pregunta },
          ]);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            { type: "diagnostico", text: res.data.diagnostico },
          ]);
        }
      });
    setText(""); // Limpiar el campo de texto después de enviar
  };

  const renderItem: ListRenderItem<Message> = ({ item }) => (
    <View style={styles.message}>
      <Text
        style={{
          fontSize: 16,
          color:
            item.type === "question"
              ? "blue"
              : item.type === "answer"
              ? "green"
              : "red",
        }}
      >
        {item.type === "question"
          ? `Pregunta: ${item.text}`
          : item.type === "answer"
          ? `Respuesta: ${item.text}`
          : `Diagnóstico: ${item.text}`}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <View style={styles.div1}>
        <Text style={{ fontSize: 28, marginBottom: 20 }}>Chatbox Area</Text>

        <Text style={{ fontSize: 16 }}>Chatbox Area is in safe area.</Text>
        <Text style={{ fontSize: 16, marginBottom: 20 }}>
          Aquí estaria el contenido de mensajes del chat
        </Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
        keyboardVerticalOffset={insets.bottom + 20} // Ajusta el offset según sea necesario
      >
        <TextInput
          style={styles.textInput}
          placeholder="Escribe tu mensaje..."
          value={text}
          onChangeText={setText}
        />
        <Button title="Send" onPress={handleSend} />
      </KeyboardAvoidingView>
    </View>
  );
}

export default function Chatbox() {
  return (
    <SafeAreaProvider>
      <ChatBoxArea />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#212426", //'#808080',
    backgroundColor: "#212426",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  div1: {
    padding: 20,
    backgroundColor: "#d0d0d0",
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#BBB", // Fondo blanco para diferenciar la zona de entrada
  },
  textInput: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  message: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#d0d0d0",
  },
});
