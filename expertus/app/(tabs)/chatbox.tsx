import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'

function ChatBoxArea() {
  const insets = useSafeAreaInsets();
  const [text, setText] = useState('');

  const handleSend = () => {
    console.log('Mensaje enviado:', text);
    setText(''); // Limpiar el campo de texto después de enviar
  };

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>

      <View style={styles.div1}>
        <Text style={{ fontSize: 28, marginBottom: 20 }}>Chatbox Area</Text>

        <Text style={{ fontSize: 16 }}>Chatbox Area is in safe area.</Text>
        <Text style={{ fontSize: 16, marginBottom: 20 }}>Aquí estaria el contenido de mensajes del chat</Text>
      </View>

      {/* Aquí estaria el contenido de mensajes del chat */}

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
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#212426',//'#808080',
    backgroundColor: '#212426',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  div1 : {
    padding: 20,
    backgroundColor: '#d0d0d0',
    flex: 1
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#BBB', // Fondo blanco para diferenciar la zona de entrada
  },
  textInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
});
