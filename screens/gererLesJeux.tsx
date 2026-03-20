import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button } from "react-native";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useFocusEffect } from "@react-navigation/native";

export default function GererLesJeux({ navigation }) {
    const [jeux, setJeux] = useState([]);
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

    const loadJeux = async () => {
        try {
            const snap = await getDocs(collection(db, "jeux"));
            const list = snap.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setJeux(list);
        } catch (error) {
            console.error("Error fetching jeux: ", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadJeux();
        }, [])
    );

    return (
        <View style={styles.viewStyle}>
            <Text style={styles.title}>
                Gérer les jeux {role === "admin" && "(admin)"}
            </Text>
            
            {role === "admin" && (
                <View style={{ marginBottom: 15, width: "100%" }}>
                    <Button color="gray" title="Créer un jeu" onPress={() => navigation.navigate("pageEditJeu")} />
                </View>
            )}

            <FlatList
                style={{ width: "100%" }}
                data={jeux}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate("pageDetailJeu", { jeu: item })}
                    >
                        <Text style={styles.cardTitle}>{item.nom}</Text>
                        <Text style={styles.cardText}>Genre : {item.genre?.libGenre || "N/A"}</Text>
                        <Text style={styles.cardText}>Plateforme : {item.plateforme?.libPlateforme || "N/A"}</Text>
                        <Text style={styles.cardText}>PEGI : {item.pegi?.ageLimite ? `${item.pegi.ageLimite}+` : "N/A"}</Text>
                        
                        {role === "admin" && (
                            <View style={{ marginTop: 10 }}>
                                <Button title="Modifier" onPress={() => navigation.navigate("pageEditJeu", { jeu: item })} />
                            </View>
                        )}
                    </TouchableOpacity>
                )}
            />
            <View style={{ marginTop: 15, width: "100%" }}>
                <Button title="Retour au menu" color="gray" onPress={() => navigation.navigate("pageMenu")} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        padding: 16,
        paddingTop: 50,
        backgroundColor: "lightgreen",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
        color: "white",
    },
    card: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    cardText: {
        fontSize: 14,
        marginTop: 4,
    },
});
