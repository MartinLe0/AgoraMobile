import React, { useState } from "react";
import { addDoc, updateDoc, deleteDoc, doc, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { View, Text, Button, StyleSheet, TextInput, Alert, ScrollView } from "react-native";
import { db } from "../services/firebaseConfig";

export default function EditJeu({ route, navigation }) {
    const jeu = route?.params?.jeu ?? null;
    
    const [nom, setNom] = useState(jeu ? jeu.nom : "");
    const [refJeu, setRefJeu] = useState(jeu ? jeu.refJeu : "");
    const [prix, setPrix] = useState(jeu ? jeu.prix?.toString() : "");
    const [dateParution, setDateParution] = useState(jeu ? jeu.dateParution : "");

    const handleCreate = async () => {
        try {
            if (!nom.trim() || !refJeu.trim()) {
                Alert.alert("Erreur", "Le nom et la référence sont obligatoires");
                return;
            }
            await addDoc(collection(db, "jeux"), {
                nom: nom,
                refJeu: refJeu,
                prix: Number(prix),
                dateParution: dateParution,
            });
            navigation.goBack();
        } catch (error) {
            console.error("Erreur :", error);
        }
    };

    const handleUpdate = async () => {
        try {
            if (!nom.trim() || !refJeu.trim()) {
                Alert.alert("Erreur", "Le nom et la référence sont obligatoires");
                return;
            }
            const docRef = doc(db, "jeux", jeu.id);
            await updateDoc(docRef, { 
                nom: nom,
                refJeu: refJeu,
                prix: Number(prix),
                dateParution: dateParution
            });
            navigation.goBack();
        } catch (error) {
            console.error("Erreur :", error);
        }
    };

    const handleDelete = async () => {
        try {
            Alert.alert("Confirmation", "Supprimer ce jeu ?", [
                { text: "Annuler" },
                {
                    text: "Supprimer",
                    style: "destructive",
                    onPress: async () => {
                        await deleteDoc(doc(db, "jeux", jeu.id));
                        navigation.goBack();
                    },
                },
            ]);
        } catch (error) {
            console.error("Erreur :", error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.viewStyle}>
            <Text style={styles.title}>{jeu ? "Modifier le jeu" : "Créer un jeu"}</Text>
            
            <TextInput 
                style={styles.input} 
                value={nom} 
                onChangeText={setNom} 
                placeholder="Nom du jeu" 
            />
            <TextInput 
                style={styles.input} 
                value={refJeu} 
                onChangeText={setRefJeu} 
                placeholder="Référence (ex: BF876309)" 
            />
            <TextInput 
                style={styles.input} 
                value={prix} 
                onChangeText={setPrix} 
                placeholder="Prix (€)" 
                keyboardType="numeric"
            />
            <TextInput 
                style={styles.input} 
                value={dateParution} 
                onChangeText={setDateParution} 
                placeholder="Date Parution (YYYY-MM-DD)" 
            />

            {jeu ? (
                <>
                    <View style={styles.buttonSpace}><Button title="Modifier" onPress={handleUpdate} /></View>
                    <View style={styles.buttonSpace}><Button title="Supprimer" color="red" onPress={handleDelete} /></View>
                </>
            ) : (
                <View style={styles.buttonSpace}><Button title="Créer" onPress={handleCreate} /></View>
            )}

            <Button color="gray" title="Retour" onPress={() => navigation.goBack()} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    viewStyle: {
        flexGrow: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: "lightgreen",
        alignItems: "center",
        paddingBottom: 40,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        color: "white",
    },
    input: {
        borderWidth: 1,
        borderColor: "black",
        width: "100%",
        padding: 10,
        marginBottom: 20,
        backgroundColor: "white",
    },
    buttonSpace: {
        marginBottom: 10,
        width: "100%",
    }
});
