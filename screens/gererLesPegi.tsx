import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export default function GererLesPegi({ navigation }) {
    const [pegi, setPegi] = useState([]);

    useEffect(() => {
        const fetchPegi = async () => {
            try {
                const snapshot = await getDocs(collection(db, "pegi"));
                const list = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPegi(list);
            } catch (error) {
                console.error("Error fetching pegi: ", error);
            }
        };
        fetchPegi();
    }, []);

    return (
        <View style={styles.viewStyle}>
            <Text style={styles.title}>Gérer les PEGI</Text>
            <FlatList
                data={pegi}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate("pageDetailPegi", { pegi: item })}
                    >
                        <Text style={styles.cardTitle}>Âge Limite : {item.ageLimite}+</Text>
                        <Text style={styles.cardText}>ID : {item.idPegi}</Text>
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
        textAlign: "center",
        color: "white"
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
