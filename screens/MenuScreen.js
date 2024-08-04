import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const MenuScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Button title="Tipos de Visitas" onPress={() => navigation.navigate('Visita')} />
            <Button title="Consulta de Escuela por Código" onPress={() => navigation.navigate('Escuela')} />
            <Button title="Consulta de Director por Cédula" onPress={() => navigation.navigate('Director')} />
            <Button title="Registrar Visita" onPress={() => navigation.navigate('Visita')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
});

export default MenuScreen;
