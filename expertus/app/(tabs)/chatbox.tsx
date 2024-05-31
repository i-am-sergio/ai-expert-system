import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ListRenderItem,
  Animated,
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import axios from "axios";
import {
  TouchableOpacity,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

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
  const [explainer, setExplainer] = useState([]);

  const slideAnim = useRef(new Animated.Value(-80)).current;
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
          setExplainer(res.data.explicacion);
        }
        flatListRef.current?.scrollToEnd({ animated: true });
      });
  };

  const renderItem: ListRenderItem<Message> = ({ item }) => {
    const isQuestion = item.type === "question";
    const isAnswer = item.type === "answer";
    const isDiagnostico = item.type === "diagnostico";

    let messageType = "";

    if (isQuestion) {
      messageType = "Pregunta";
    } else if (isAnswer) {
      messageType = "Respuesta";
    } else if (isDiagnostico) {
      messageType = "Diagnóstico";
    }

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
            isQuestion && styles.questionText,
            isAnswer && styles.answerText,
            isDiagnostico && styles.diagnosticoText,
          ]}
        >
          {`${messageType}: ${item.text}`}
        </Text>
        {isDiagnostico && (
          <View style={styles.diagnostico}>
            <Text style={styles.explanationTitle}>Explicación:</Text>
            {explainer.map((exp, index) => (
              <Text key={exp} style={styles.explanationText}>
                - {exp}
              </Text>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <View style={styles.div1}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Habla con Expertus !!! </Text>
          <TouchableOpacity onPress={handleReset}>
            <Text style={styles.rebootLink}>Reiniciar diagnóstico</Text>
          </TouchableOpacity>
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
            <Text style={styles.buttonTextSi}>SI</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonNo]}
            onPress={() => handleSend("no")}
            disabled={block}
          >
            <Text style={styles.buttonTextNo}>NO</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export default function ChatboxScreen() {
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
    backgroundColor: "#ffffff",
    paddingBottom: 30,
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerText: {
    width: 200,
    fontSize: 24,
    fontWeight: "800",
    color: "#333",
  },
  headerReboot: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 60,
    borderRadius: 8,
  },
  rebootLink: {
    width: 100,
    color: "#8948c7",
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
    textAlign: "center",
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
    backgroundColor: "#ffffff",
  },
  buttonNo: {
    color: "#000",
    backgroundColor: "#ffffff",
    borderColor: "#8948c7",
    borderWidth: 1,
    fontWeight: "bold",
  },
  buttonSi: {
    backgroundColor: "#8948c7",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    height: 45,
    backgroundColor: "#ffffff",
  },

  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 60,
    borderRadius: 8,
  },

  buttonTextSi: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonTextNo: {
    color: "#8948c7",
    fontWeight: "bold",
    fontSize: 16,
  },
  message: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    maxWidth: "80%",
  },
  questionMessage: {
    backgroundColor: "#8948c7",
    alignSelf: "flex-start",
  },
  answerMessage: {
    backgroundColor: "#ededed",
    alignSelf: "flex-end",
  },
  diagnosticoMessage: {
    backgroundColor: "#e9c3fa",
    alignSelf: "center",
  },
  questionText: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "left",
  },
  answerText: {
    fontSize: 16,
    color: "#000",
    textAlign: "right",
  },
  diagnosticoText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#000",
  },
  diagnostico: {
    marginTop: 10,
    padding: 10,
    color: "#ffffff",
    borderRadius: 8,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
  },
  explanationText: {
    justifyContent: "center",
    fontSize: 14,
    color: "#000",
  },


});
