import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Touchable,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function LoginScreen({ onLogin }: any) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Verifica las credenciales
    if (email === "user@gmail.com" && password === "12345") {
      // Llama a la función onLogin que se pasa como prop
      onLogin();
    } else {
      // Muestra un mensaje de error o toma otra acción
      alert("Credenciales incorrectas");
    }
  };

  const handleRegister = () => {
    // Navega a la pantalla de registro
    router.push("register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      {/* <Button 
      title="Login" 
      onPress={handleLogin} 
    /> */}
      <TouchableOpacity>
        <Text style={styles.button} onPress={handleLogin}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.secondaryButton} onPress={handleRegister}>
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 28,
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 16,
    textAlign: "center",
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
