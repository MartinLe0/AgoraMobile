import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useFocusEffect } from "@react-navigation/native";

export default function GererLesGenres({ navigation }) {
    const [genres, setGenres] = useState([]);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                navigation.replace("pageConnexion");
                return;
            }
            try {
                const userDoc = await getDoc(doc(db, "utilisateurs", user.uid));
                if (userDoc.exists()) {
                    setRole(userDoc.data().role);
                } else {
                    setRole("inconnu");
                }
            } catch (error) {
                console.log("Erreur lecture Firestore :", error);
            }
        });
        return unsubscribe;
    }, []);

    const loadGenres = async () => {
        try {
            const genresCol = collection(db, "genres");
            const genreSnapshot = await getDocs(genresCol);
            const data = genreSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setGenres(data);
        } catch (error) {
            console.error("Error fetching genres: ", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadGenres();
        }, [])
    );

    return (
        <View style={styles.viewStyle}>
            <Text style={styles.title}>
                Gérer les Genres {role === "admin" && "(admin)"}
            </Text>
            
            {role === "admin" && (
                <View style={{ marginBottom: 15, width: "100%" }}>
                    <Button color="gray" title="Créer un genre" onPress={() => navigation.navigate("pageEditGenre")} />
                </View>
            )}

            <FlatList
                style={{ width: "100%" }}
                data={genres}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate("pageDetailGenre", { genre: item })}
                    >
                        <Text style={styles.cardTitle}>{item.libGenre}</Text>
                        <Text style={styles.cardText}>ID : {item.idGenre}</Text>
                        
                        {role === "admin" && (
                            <View style={{ marginTop: 10 }}>
                                <Button title="Modifier" onPress={() => navigation.navigate("pageEditGenre", { genre: item })} />
                            </View>
                        )}
                    </TouchableOpacity>
                )}
            />
            <View style={{ marginTop: 15, width: "100%" }}>
                <Button color="gray" title="Retour au menu" onPress={() => navigation.navigate("pageMenu")} />
            </View>
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
