import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ListRenderItem,
  Dimensions,
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";

type Message = {
  type: "question" | "answer" | "diagnostico";
  text: string;
};

function ChatBoxArea() {
  const insets = useSafeAreaInsets();
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

  const handleSend = (message: string) => {
    if (message.trim() === "") return;
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "answer", text: message },
    ]);
    //http://127.0.0.1:5000/respuesta
    axios
      .post("http://127.0.0.1:5000/respuesta", {
        respuesta: message,
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
  };

  const renderItem: ListRenderItem<Message> = ({ item }) => {
    let textColor;
    if (item.type === "question") {
      textColor = "blue";
    } else if (item.type === "answer") {
      textColor = "green";
    } else {
      textColor = "red";
    }

    let displayText;
    if (item.type === "question") {
      displayText = `Pregunta: ${item.text}`;
    } else if (item.type === "answer") {
      displayText = `Respuesta: ${item.text}`;
    } else {
      displayText = `Diagnóstico: ${item.text}`;
    }

    return (
      <View style={styles.message}>
        <Text style={{ fontSize: 16, color: textColor }}>{displayText}</Text>
      </View>
    );
  };

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
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonSi]}
            onPress={() => handleSend("si")}
          >
            <Text style={styles.buttonText}>SI</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonNo]}
            onPress={() => handleSend("no")}
          >
            <Text style={styles.buttonText}>NO</Text>
          </TouchableOpacity>
        </View>
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
    color: "#212426",
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
    flexDirection: "column",
    padding: 8,
    backgroundColor: "#BBB",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    flex: 1,
    padding: 20,
    borderRadius: 4,
    alignItems: "center",
    marginHorizontal: 5,
    width: Dimensions.get("window").width - 400,
  },
  buttonNo: {
    backgroundColor: "red",
  },
  buttonSi: {
    backgroundColor: "green",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  textInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginTop: 8,
  },
  message: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#d0d0d0",
  },
});
