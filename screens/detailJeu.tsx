import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function DetailJeu({ route, navigation }) {
    const { jeu } = route.params;

    return (
        <View style={styles.viewStyle}>
            <Text style={styles.title}>{jeu.nom}</Text>

            <View style={styles.infoContainer}>
                <Text style={styles.label}>Référence :</Text>
                <Text style={styles.text}>{jeu.refJeu}</Text>

                <Text style={styles.label}>Prix :</Text>
                <Text style={styles.text}>{jeu.prix} €</Text>

                <Text style={styles.label}>Date de parution :</Text>
                <Text style={styles.text}>{jeu.dateParution}</Text>

                <Text style={styles.label}>Genre :</Text>
                <Text style={styles.text}>{jeu.genre?.libGenre}</Text>

                <Text style={styles.label}>PEGI :</Text>
                <Text style={styles.text}>{jeu.pegi?.ageLimite}+</Text>

                <Text style={styles.label}>Plateforme :</Text>
                <Text style={styles.text}>{jeu.plateforme?.libPlateforme}</Text>

                <Text style={styles.label}>Marque :</Text>
                <Text style={styles.text}>{jeu.marque?.nomMarque}</Text>
            </View>

            <Button
                color="#2196F3"
                title="RETOUR À LA LISTE DES JEUX"
                onPress={() => navigation.navigate("pageGererLesJeux")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 16,
        backgroundColor: "lightgreen",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
    },
    infoContainer: {
        marginBottom: 30,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
});
