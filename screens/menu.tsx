import React from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { auth } from "../services/firebaseConfig";
import { signOut } from "firebase/auth";

export default function Menu({ navigation }) {
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigation.navigate("pageConnexion");
            })
            .catch((error) => {
                Alert.alert("Erreur", "Impossible de se déconnecter : " + error.message);
            });
    };

    return (
        <View style={styles.viewStyle}>
            <Text style={styles.title}>Menu Principal</Text>

            <View style={styles.grid}>
                <Button
                    color="#607D8B"
                    title="Gérer les genres"
                    onPress={() => navigation.navigate("pageGererLesGenres")}
                />
                <View style={styles.spacer} />
                <Button
                    color="#607D8B"
                    title="Gérer les jeux"
                    onPress={() => navigation.navigate("pageGererLesJeux")}
                />
                <View style={styles.spacer} />
                <Button
                    color="#607D8B"
                    title="Gérer les marques"
                    onPress={() => navigation.navigate("pageGererLesMarques")}
                />
                <View style={styles.spacer} />
                <Button
                    color="#607D8B"
                    title="Gérer les PEGI"
                    onPress={() => navigation.navigate("pageGererLesPegi")}
                />
                <View style={styles.spacer} />
                <Button
                    color="#607D8B"
                    title="Gérer les plateformes"
                    onPress={() => navigation.navigate("pageGererLesPlateformes")}
                />
            </View>

            <View style={styles.logoutContainer}>
                <Button
                    color="#F44336"
                    title="Déconnexion"
                    onPress={handleLogout}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 25,
        backgroundColor: "lightgreen",
        alignItems: "stretch",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
        color: "white",
    },
    grid: {
        flex: 1,
    },
    spacer: {
        height: 15,
    },
    logoutContainer: {
        marginBottom: 40,
        marginTop: 20,
    }
});
