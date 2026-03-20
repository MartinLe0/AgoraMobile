import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useFocusEffect } from "@react-navigation/native";

export default function GererLesPegi({ navigation }) {
    const [pegi, setPegi] = useState([]);
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

    const loadPegi = async () => {
        try {
            const snapshot = await getDocs(collection(db, "pegi"));
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setPegi(data);
        } catch (error) {
            console.error("Error fetching pegi: ", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadPegi();
        }, [])
    );

    return (
        <View style={styles.viewStyle}>
            <Text style={styles.title}>
                Gérer les PEGI {role === "admin" && "(admin)"}
            </Text>

            {role === "admin" && (
                <View style={{ marginBottom: 15, width: "100%" }}>
                    <Button color="gray" title="Créer un PEGI" onPress={() => navigation.navigate("pageEditPegi")} />
                </View>
            )}

            <FlatList
                style={{ width: "100%" }}
                data={pegi}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate("pageDetailPegi", { pegi: item })}
                    >
                        <Text style={styles.cardTitle}>Âge Limite : {item.ageLimite}+</Text>
                        <Text style={styles.cardText}>ID : {item.idPegi}</Text>
                        
                        {role === "admin" && (
                            <View style={{ marginTop: 10 }}>
                                <Button title="Modifier" onPress={() => navigation.navigate("pageEditPegi", { pegi: item })} />
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
