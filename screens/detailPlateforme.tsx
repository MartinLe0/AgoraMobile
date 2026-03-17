import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function DetailPlateforme({ route, navigation }) {
    const { plateforme } = route.params;

    return (
        <View style={styles.viewStyle}>
            <Text style={styles.title}>{plateforme.libPlateforme}</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Nom du support :</Text>
                <Text style={styles.text}>{plateforme.libPlateforme}</Text>

                <Text style={styles.label}>Identifiant (ID) :</Text>
                <Text style={styles.text}>{plateforme.idPlateforme}</Text>
            </View>
            <Button
                color="gray"
                title="Retour à la liste"
                onPress={() => navigation.navigate("pageGererLesPlateformes")}
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
        fontSize: 20,
        marginBottom: 15,
    },
});
