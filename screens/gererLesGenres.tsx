import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export default function GererLesGenres({ navigation }) {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const genresCol = collection(db, "genres");
                const genreSnapshot = await getDocs(genresCol);
                const genreList = genreSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setGenres(genreList);
            } catch (error) {
                console.error("Error fetching genres: ", error);
            }
        };
        fetchGenres();
    }, []);

    return (
        <View style={styles.viewStyle}>
            <Text style={styles.title}>Gérer les Genres</Text>
            <FlatList
                data={genres}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate("pageDetailGenre", { genre: item })}
                    >
                        <Text style={styles.cardTitle}>{item.libGenre}</Text>
                        <Text style={styles.cardText}>ID : {item.idGenre}</Text>
                    </TouchableOpacity>
                )}
            />
            <Button
                color="gray"
                title="Retour au menu"
                onPress={() => navigation.navigate("pageMenu")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 12,
        backgroundColor: "lightgreen",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "white",
    },
    card: {
        width: "100%",
        backgroundColor: "white",
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    cardText: {
        fontSize: 14,
        marginTop: 4,
    }
});
