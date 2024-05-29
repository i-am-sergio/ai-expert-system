import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ListRenderItem,
  Button,
  Animated,
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GestureHandlerRootView } from 'react-native-gesture-handler';  // Importar GestureHandlerRootView

type Message = {
  type: "question" | "answer" | "diagnostico";
  text: string;
};

function ChatBoxArea() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<Message[]>([]);
  const flatListRef = useRef<FlatList>(null);
  const [reset, setReset] = useState(false);
  const [block, setBlock] = useState(false);

  const slideAnim = useRef(new Animated.Value(-100)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Obtener la pregunta inicial
    axios
      .get(
        "https://ai-expert-system-vocational-guidance-gbod.onrender.com/pregunta"
      )
      .then((res) => {
        if (res.data.pregunta) {
          setMessages([{ type: "question", text: res.data.pregunta }]);
        }
      });
  }, []);

  const handleReset = () => {
    setMessages([]);
    axios
      .post(
        "https://ai-expert-system-vocational-guidance-gbod.onrender.com/nuevo_diagnostico"
      )
      .then((res) => {
        if (res.data.mensaje) {
          axios
            .get(
              "https://ai-expert-system-vocational-guidance-gbod.onrender.com/pregunta"
            )
            .then((res) => {
              if (res.data.pregunta) {
                setMessages([{ type: "question", text: res.data.pregunta }]);
              }
            });
          setReset(true);
          setBlock(false);
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start();
          const handleAnimationComplete = () => {
            setReset(false);
            slideAnim.setValue(-100);
            fadeAnim.setValue(1);
          };

          setTimeout(() => {
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }).start(handleAnimationComplete);
          }, 2000); // Oculta el mensaje después de 2 segundos
        }
      });
  };

  const handleSend = (message: string) => {
    if (message.trim() === "") return;
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "answer", text: message },
    ]);
    axios
      .post(
        "https://ai-expert-system-vocational-guidance-gbod.onrender.com/respuesta",
        {
          respuesta: message,
        }
      )
      .then((res) => {
        if (res.data.pregunta) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { type: "question", text: res.data.pregunta },
          ]);
        } else {
          setBlock(true);
          setMessages((prevMessages) => [
            ...prevMessages,
            { type: "diagnostico", text: res.data.diagnostico },
          ]);
        }
        flatListRef.current?.scrollToEnd({ animated: true });
      });
  };

  const renderItem: ListRenderItem<Message> = ({ item }) => {
    const isQuestion = item.type === "question";
    const isAnswer = item.type === "answer";
    const isDiagnostico = item.type === "diagnostico";

    return (
      <View
        style={[
          styles.message,
          isQuestion && styles.questionMessage,
          isAnswer && styles.answerMessage,
          isDiagnostico && styles.diagnosticoMessage,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            isQuestion && styles.questionText,
            isAnswer && styles.answerText,
            isDiagnostico && styles.diagnosticoText,
          ]}
        >
          {item.type === "question"
            ? `Pregunta: ${item.text}`
            : item.type === "answer"
            ? `Respuesta: ${item.text}`
            : `Diagnóstico: ${item.text}`}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <View style={styles.div1}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Habla con Expertus</Text>
          <Button
            title="Reiniciar diagnóstico"
            onPress={handleReset}
            color="#6c757d" // Color plomo mejorado
          />
        </View>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
        {reset && (
          <Animated.View
            style={[
              styles.resetMessage,
              { transform: [{ translateY: slideAnim }], opacity: fadeAnim },
            ]}
          >
            <Text style={styles.resetMessageText}>
              Diagnóstico reiniciado. Puede comenzar un nuevo diagnóstico.
            </Text>
          </Animated.View>
        )}
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
            disabled={block}
          >
            <Text style={styles.buttonText}>SI</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonNo]}
            onPress={() => handleSend("no")}
            disabled={block}
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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ChatBoxArea />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  div1: {
    padding: 20,
    backgroundColor: "#d0d0d0",
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
  },
  resetMessage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "#6c757d",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  resetMessageText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "column",
    padding: 8,
    backgroundColor: "#BBB",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "8%",
  },
  button: {
    flex: 1,
    marginHorizontal: 2.5,
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonNo: {
    backgroundColor: "#f05330",
    fontWeight: "bold",
    width: "50%",
  },
  buttonSi: {
    backgroundColor: "#67b2f0",
    fontWeight: "bold",
    width: "50%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
    borderRadius: 8,
    maxWidth: "80%",
  },
  questionMessage: {
    backgroundColor: "#007BFF",
    alignSelf: "flex-start",
  },
  answerMessage: {
    backgroundColor: "#007BFF",
    alignSelf: "flex-end",
  },
  diagnosticoMessage: {
    backgroundColor: "#28A745",
    alignSelf: "center",
  },
  messageText: {
    fontSize: 16,
    color: "white",
  },
  questionText: {
    textAlign: "left",
  },
  answerText: {
    textAlign: "right",
  },
  diagnosticoText: {
    textAlign: "center",
  },
});
