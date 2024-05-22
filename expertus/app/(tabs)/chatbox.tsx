import React, { useState, useEffect, useRef } from "react";
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
  Keyboard,
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import axios from "axios";

type Message = {
  type: "question" | "answer" | "diagnostico";
  text: string;
};

function ChatBoxArea() {
  const insets = useSafeAreaInsets();
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Obtener la pregunta inicial
    axios.get("http://127.0.0.1:5000/pregunta").then((res) => {
      if (res.data.pregunta) {
        setMessages([{ type: "question", text: res.data.pregunta }]);
      }
    });
  }, []);

  const handleSend = () => {
    if (text.trim() === "") return;
    console.log("Mensaje enviado:", text);
    setMessages((prevMessages) => [...prevMessages, { type: "answer", text }]);
    //http://127.0.0.1:5000/respuesta
    axios
      .post("http://127.0.0.1:5000/respuesta", {
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
        flatListRef.current?.scrollToEnd({ animated: true });
      });
    setText("");
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
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
        keyboardVerticalOffset={insets.bottom + 20}
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
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#BBB",
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
