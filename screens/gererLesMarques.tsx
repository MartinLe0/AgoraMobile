import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useFocusEffect } from "@react-navigation/native";

export default function GererLesMarques({ navigation }) {
    const [marques, setMarques] = useState([]);
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

    const loadMarques = async () => {
        try {
            const snapshot = await getDocs(collection(db, "marques"));
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setMarques(data);
        } catch (error) {
            console.error("Error fetching marques: ", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadMarques();
        }, [])
    );

    return (
        <View style={styles.viewStyle}>
            <Text style={styles.title}>
                Gérer les Marques {role === "admin" && "(admin)"}
            </Text>

            {role === "admin" && (
                <View style={{ marginBottom: 15, width: "100%" }}>
                    <Button color="gray" title="Créer une marque" onPress={() => navigation.navigate("pageEditMarque")} />
                </View>
            )}

            <FlatList
                style={{ width: "100%" }}
                data={marques}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate("pageDetailMarque", { marque: item })}
                    >
                        <Text style={styles.cardTitle}>{item.nomMarque}</Text>
                        <Text style={styles.cardText}>ID : {item.idMarque}</Text>
                        
                        {role === "admin" && (
                            <View style={{ marginTop: 10 }}>
                                <Button title="Modifier" onPress={() => navigation.navigate("pageEditMarque", { marque: item })} />
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
        textAlign: "center",
        color: "white",
    },
    card: {
        width: "100%",
        backgroundColor: "white",
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
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
