import React, { useState } from "react";
import { addDoc, updateDoc, deleteDoc, doc, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { View, Text, Button, StyleSheet, TextInput, Alert } from "react-native";
import { db } from "../services/firebaseConfig";

export default function EditPegi({ route, navigation }) {
    const pegi = route?.params?.pegi ?? null;
    const [ageLimite, setAgeLimite] = useState(pegi ? pegi.ageLimite.toString() : "");

    const handleCreate = async () => {
        try {
            if (!ageLimite.trim() || isNaN(Number(ageLimite))) {
                Alert.alert("Erreur", "L'âge est obligatoire et doit être un nombre");
                return;
            }
            const q = query(collection(db, "pegi"), orderBy("idPegi", "desc"), limit(1));
            const snapshot = await getDocs(q);
            let newId = 1;

            if (!snapshot.empty) {
                const highest = snapshot.docs[0].data();
                if (highest.idPegi) newId = highest.idPegi + 1;
            }

            await addDoc(collection(db, "pegi"), {
                idPegi: newId,
                ageLimite: Number(ageLimite),
            });
            navigation.goBack();
        } catch (error) {
            console.error("Erreur :", error);
        }
    };

    const handleUpdate = async () => {
        try {
            if (!ageLimite.trim() || isNaN(Number(ageLimite))) {
                Alert.alert("Erreur", "L'âge est obligatoire et doit être un nombre");
                return;
            }
            const docRef = doc(db, "pegi", pegi.id);
            await updateDoc(docRef, { ageLimite: Number(ageLimite) });
            navigation.goBack();
        } catch (error) {
            console.error("Erreur :", error);
        }
    };

    const handleDelete = async () => {
        try {
            Alert.alert("Confirmation", "Supprimer ce PEGI ?", [
                { text: "Annuler" },
                {
                    text: "Supprimer",
                    style: "destructive",
                    onPress: async () => {
                        await deleteDoc(doc(db, "pegi", pegi.id));
                        navigation.goBack();
                    },
                },
            ]);
        } catch (error) {
            console.error("Erreur :", error);
        }
    };

    return (
        <View style={styles.viewStyle}>
            <Text style={styles.title}>{pegi ? "Modifier la classification" : "Créer un PEGI"}</Text>
            
            <TextInput 
                style={styles.input} 
                value={ageLimite} 
                onChangeText={setAgeLimite} 
                placeholder="Age limite (ex: 18)" 
                keyboardType="numeric"
            />

            {pegi ? (
                <>
                    <View style={styles.buttonSpace}><Button title="Modifier" onPress={handleUpdate} /></View>
                    <View style={styles.buttonSpace}><Button title="Supprimer" color="red" onPress={handleDelete} /></View>
                </>
            ) : (
                <View style={styles.buttonSpace}><Button title="Créer" onPress={handleCreate} /></View>
            )}

            <Button color="gray" title="Retour" onPress={() => navigation.goBack()} />
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
