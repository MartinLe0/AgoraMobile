import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function DetailPegi({ route, navigation }) {
    const { pegi } = route.params;

    return (
        <View style={styles.viewStyle}>
            <Text style={styles.title}>Classification PEGI</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Limite d'âge :</Text>
                <Text style={styles.ageText}>{pegi.ageLimite}+</Text>

                <Text style={styles.label}>Identifiant (ID) :</Text>
                <Text style={styles.text}>{pegi.idPegi}</Text>
            </View>
            <Button
                color="gray"
                title="Retour à la liste"
                onPress={() => navigation.navigate("pageGererLesPegi")}
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
        alignItems: "center"
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#555"
    },
    ageText: {
        fontSize: 48,
        fontWeight: "bold",
        color: "#d32f2f",
        marginVertical: 10,
    },
    text: {
        fontSize: 18,
    },
});
