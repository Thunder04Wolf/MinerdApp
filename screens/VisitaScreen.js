import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

const VisitaScreen = () => {
    const [directorId, setDirectorId] = useState('');
    const [centroCode, setCentroCode] = useState('');
    const [motivo, setMotivo] = useState('');
    const [comentario, setComentario] = useState('');
    const [foto, setFoto] = useState(null);
    const [notaVoz, setNotaVoz] = useState(null);
    const [location, setLocation] = useState(null);

    const handleFoto = async () => {
        let result = await ImagePicker.launchCameraAsync();
        if (!result.canceled) {
            setFoto(result.uri);
        }
    };

    const handleLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }
        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
    };

    const handleSubmit = () => {
        const handleSubmit = async () => {
            const data = {
                directorId,
                centroCode,
                motivo,
                comentario,
                foto,
                notaVoz,
                latitude: location?.coords?.latitude,
                longitude: location?.coords?.longitude,
            };

            try {
                const response = await fetch('https://your-api-endpoint.com/register-visit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    alert('Visita registrada exitosamente');
                } else {
                    alert('Error al registrar la visita');
                }
            } catch (error) {
                console.error(error);
                alert('Error al registrar la visita');
            }
        };
    };

    return (
        <View style={styles.container}>
            <Text>Registrar Visita</Text>
            <TextInput
                placeholder="Cédula del Director"
                value={directorId}
                onChangeText={setDirectorId}
                style={styles.input}
            />
            <TextInput
                placeholder="Código del Centro"
                value={centroCode}
                onChangeText={setCentroCode}
                style={styles.input}
            />
            <TextInput
                placeholder="Motivo de la Visita"
                value={motivo}
                onChangeText={setMotivo}
                style={styles.input}
            />
            <TextInput
                placeholder="Comentario"
                value={comentario}
                onChangeText={setComentario}
                style={styles.input}
            />
            <Button title="Adjuntar Foto" onPress={handleFoto} />
            <Button title="Obtener Ubicación" onPress={handleLocation} />
            <Button title="Registrar Visita" onPress={handleSubmit} />
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
});

export default VisitaScreen;
