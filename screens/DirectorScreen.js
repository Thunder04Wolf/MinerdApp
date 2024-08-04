import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const DirectorScreen = () => {
    const [cedula, setCedula] = useState('');
    const [director, setDirector] = useState(null);

    const handleConsulta = async () => {
        try {
            const response = await fetch(`https://adamix.net/minerd/director/${cedula}`);
            const data = await response.json();
            setDirector(data);
        } catch (error) {
            console.error(error);
            alert('Error al consultar el director');
        }
    };

    return (
        <View style={styles.container}>
            <Text>Consultar Director por Cédula</Text>
            <TextInput
                placeholder="Cédula del Director"
                value={cedula}
                onChangeText={setCedula}
                style={styles.input}
            />
            <Button title="Consultar" onPress={handleConsulta} />
            {director && (
                <View style={styles.result}>
                    <Text>Nombre: {director.nombre}</Text>
                    <Text>Apellido: {director.apellido}</Text>
                    <Text>Fecha de Nacimiento: {director.fecha_nacimiento}</Text>
                    <Text>Dirección: {director.direccion}</Text>
                    <Text>Teléfono: {director.telefono}</Text>
                    <Text>Foto:</Text>
                    <Image source={{ uri: director.foto }} style={styles.image} />
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
    image: {
        width: 100,
        height: 100,
        marginTop: 8,
    },
});

export default DirectorScreen;
