import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export default function GererLesPlateformes({ navigation }) {
    const [plateformes, setPlateformes] = useState([]);

    useEffect(() => {
        const fetchPlateformes = async () => {
            try {
                const snapshot = await getDocs(collection(db, "plateformes"));
                const list = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPlateformes(list);
            } catch (error) {
                console.error("Error fetching plateformes: ", error);
            }
        };
        fetchPlateformes();
    }, []);

    return (
        <View style={styles.viewStyle}>
            <Text style={styles.title}>Gérer les Plateformes</Text>
            <FlatList
                data={plateformes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate("pageDetailPlateforme", { plateforme: item })}
                    >
                        <Text style={styles.cardTitle}>{item.libPlateforme}</Text>
                        <Text style={styles.cardText}>ID : {item.idPlateforme}</Text>
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
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center"
    },
    card: {
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
