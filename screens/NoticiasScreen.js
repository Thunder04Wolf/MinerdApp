import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const NoticiasScreen = () => {
    const [noticias, setNoticias] = useState([]);

    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                const response = await fetch('https://remolacha.net/wp-json/wp/v2/posts?search=minerd');
                const data = await response.json();
                setNoticias(data);
            } catch (error) {
                console.error(error);
                alert('Error al cargar las noticias');
            }
        };

        fetchNoticias();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => alert(item.link)}>
            <Text style={styles.title}>{item.title.rendered}</Text>
            <Text style={styles.excerpt}>{item.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Noticias MINERD</Text>
            <FlatList
                data={noticias}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

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