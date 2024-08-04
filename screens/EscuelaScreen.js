import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const EscuelaScreen = () => {
    const [codigo, setCodigo] = useState('');
    const [escuela, setEscuela] = useState(null);

    const handleConsulta = async () => {
        try {
            const response = await fetch(`https://adamix.net/minerd/escuela/${codigo}`);
            const data = await response.json();
            setEscuela(data);
        } catch (error) {
            console.error(error);
            alert('Error al consultar la escuela');
        }
    };

    return (
        <View style={styles.container}>
            <Text>Consultar Escuela por Código</Text>
            <TextInput
                placeholder="Código de la Escuela"
                value={codigo}
                onChangeText={setCodigo}
                style={styles.input}
            />
            <Button title="Consultar" onPress={handleConsulta} />
            {escuela && (
                <View style={styles.result}>
                    <Text>Nombre: {escuela.nombre}</Text>
                    <Text>Dirección: {escuela.direccion}</Text>
                    <Text>Teléfono: {escuela.telefono}</Text>
                    <Text>Director: {escuela.director}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    result: {
        marginTop: 16,
    },
});

export default EscuelaScreen;
