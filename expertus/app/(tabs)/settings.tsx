import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SettingsScreen({ navigation, setIsLoggedIn } : any) {
    const handleMoreInfo = () => {
        // Lógica para la pantalla de más información
    };

    const handleLogout = () => {
        // Lógica para cerrar sesión
        setIsLoggedIn(false);
    };

    return (
      <View style={styles.container}>
      <Text style={styles.usernameText}>Nombre de usuario</Text>
      <TouchableOpacity>
          <Text style={styles.link} onPress={handleMoreInfo}>
              Más información
          </Text>
      </TouchableOpacity>
      <TouchableOpacity>
          <Text style={styles.button} onPress={handleLogout}>
              Cerrar sesión
          </Text>
      </TouchableOpacity>
  </View>
    );
}



const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  usernameText: {
      fontSize: 20,
      marginBottom: 20,
  },
  link: {
      fontSize: 16,
      color: 'blue',
      textDecorationLine: 'underline',
      marginBottom: 20,
  },
  button: {
      textAlign: 'center',
      backgroundColor: '#8948c7',
      paddingVertical: 8,
      color: 'white',
      paddingHorizontal: 24,
      borderRadius: 8,
  }
});

