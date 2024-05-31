import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function SettingsScreen({ navigation }) {
    const handleMoreInfo = () => {
        // Lógica para la pantalla de más información
    };

    const handleLogout = () => {
        // Lógica para cerrar sesión
    };

    return (
        <View style={styles.container}>
            <Text style={styles.usernameText}>Nombre de usuario</Text>
            <Button title="Más información" onPress={handleMoreInfo} />
            <Button title="Cerrar sesión" onPress={handleLogout} />
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
});
