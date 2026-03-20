import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useFocusEffect } from "@react-navigation/native";

export default function GererLesPlateformes({ navigation }) {
    const [plateformes, setPlateformes] = useState([]);
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

    const loadPlateformes = async () => {
        try {
            const snapshot = await getDocs(collection(db, "plateformes"));
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setPlateformes(data);
        } catch (error) {
            console.error("Error fetching plateformes: ", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadPlateformes();
        }, [])
    );

    return (
        <View style={styles.viewStyle}>
            <Text style={styles.title}>
                Gérer les Plateformes {role === "admin" && "(admin)"}
            </Text>

            {role === "admin" && (
                <View style={{ marginBottom: 15, width: "100%" }}>
                    <Button color="gray" title="Créer une plateforme" onPress={() => navigation.navigate("pageEditPlateforme")} />
                </View>
            )}

            <FlatList
                style={{ width: "100%" }}
                data={plateformes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate("pageDetailPlateforme", { plateforme: item })}
                    >
                        <Text style={styles.cardTitle}>{item.libPlateforme}</Text>
                        <Text style={styles.cardText}>ID : {item.idPlateforme}</Text>
                        
                        {role === "admin" && (
                            <View style={{ marginTop: 10 }}>
                                <Button title="Modifier" onPress={() => navigation.navigate("pageEditPlateforme", { plateforme: item })} />
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
