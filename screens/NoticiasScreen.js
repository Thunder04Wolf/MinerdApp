// NoticiasScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

// Componente principal para la pantalla de noticias
const NoticiasScreen = () => {
    // Estado para almacenar las noticias
    const [noticias, setNoticias] = useState([]);

    // Hook useEffect para obtener las noticias cuando el componente se monta
    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                // Realiza la solicitud GET para obtener las noticias desde el API
                const response = await fetch('https://remolacha.net/wp-json/wp/v2/posts?search=minerd');
                const data = await response.json();
                setNoticias(data); // Actualiza el estado con las noticias obtenidas
            } catch (error) {
                console.error(error); // Muestra el error en la consola
                alert('Error al cargar las noticias'); // Muestra un mensaje de error
            }
        };

        fetchNoticias(); // Llama a la función para obtener las noticias
    }, []);

    // Función para renderizar cada ítem de la lista de noticias
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => alert(item.link)}>
            <Text style={styles.title}>{item.title.rendered}</Text>
            <Text style={styles.excerpt}>
                {item.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "")}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Noticias MINERD</Text>
            <FlatList
                data={noticias} // Datos a mostrar en la lista
                renderItem={renderItem} // Función para renderizar cada ítem
                keyExtractor={(item) => item.id.toString()} // Llave única para cada ítem
                contentContainerStyle={styles.list} // Estilos para el contenedor de la lista
            />
        </View>
    );
};

// Estilos para la pantalla de noticias
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    list: {
        paddingBottom: 16,
    },
    item: {
        marginBottom: 16,
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    excerpt: {
        marginTop: 8,
        fontSize: 14,
        color: '#555',
    },
});

export default NoticiasScreen;
