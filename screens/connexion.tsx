import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, Alert } from "react-native";
import { auth } from "../services/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Connexion({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (email === "" || password === "") {
            Alert.alert("Erreur", "Veuillez remplir tous les champs");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigation.navigate("pageMenu");
            })
            .catch((error) => {
                Alert.alert("Erreur de connexion", error.message);
            });
    };

    return (
        <View style={styles.viewStyle}>
            <Text style={styles.title}>Agora Mobile</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <View style={styles.buttonContainer}>
                <Button
                    color="#4CAF50"
                    title="Se connecter"
                    onPress={handleLogin}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: "lightgreen",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 40,
        color: "white",
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "white",
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    buttonContainer: {
        width: "100%",
        marginTop: 10,
    }
});
