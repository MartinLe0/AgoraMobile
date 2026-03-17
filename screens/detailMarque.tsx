import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function DetailMarque({ route, navigation }) {
    const { marque } = route.params;

    return (
        <View style={styles.viewStyle}>
            <Text style={styles.title}>{marque.nomMarque}</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Identifiant (ID) :</Text>
                <Text style={styles.text}>{marque.idMarque}</Text>

                <Text style={styles.label}>Nom complet :</Text>
                <Text style={styles.text}>{marque.nomMarque}</Text>
            </View>
            <Button
                color="gray"
                title="Retour à la liste"
                onPress={() => navigation.navigate("pageGererLesMarques")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: "lightgreen",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "white"
    },
    infoContainer: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
        elevation: 2,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#555"
    },
    text: {
        fontSize: 18,
        marginBottom: 15,
    },
});
