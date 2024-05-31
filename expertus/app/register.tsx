import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Touchable, Alert } from 'react-native';
import { useNavigation } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = () => {
    axios.post('https://ai-expert-system-vocational-guidance-gbod.onrender.com/register', {
      username: email,
      password: password,
    })
    .then((response) => {
      Alert.alert('Registro exitoso', 'Usuario registrado con éxito');
      navigation.goBack(); // Navigate back to the login screen
    })
    .catch((error) => {
      Alert.alert('Error', 'Hubo un problema con el registro');
      console.error("Error registering user:", error);
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity>
        <Text style={styles.button} onPress={handleRegister}>
          Register
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.secondaryButton} onPress={() => navigation.goBack()}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 28,
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontWeight: "800",
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },

  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#8948c7",
    color: "white",
    textAlign: "center",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  secondaryButton: {
    color: "#8948c7",
    textAlign: "center",
    padding: 12,
    borderRadius: 8,
    textDecorationLine: "underline",
  }
});

