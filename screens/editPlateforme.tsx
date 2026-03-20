import React, { useState } from "react";
import { addDoc, updateDoc, deleteDoc, doc, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { View, Text, Button, StyleSheet, TextInput, Alert } from "react-native";
import { db } from "../services/firebaseConfig";

export default function EditPlateforme({ route, navigation }) {
    const plateforme = route?.params?.plateforme ?? null;
    const [libPlateforme, setLibPlateforme] = useState(plateforme ? plateforme.libPlateforme : "");

    const handleCreate = async () => {
        try {
            if (!libPlateforme.trim()) {
                Alert.alert("Erreur", "Le nom de la plateforme est obligatoire");
                return;
            }
            const q = query(collection(db, "plateformes"), orderBy("idPlateforme", "desc"), limit(1));
            const snapshot = await getDocs(q);
            let newId = 1;

            if (!snapshot.empty) {
                const highest = snapshot.docs[0].data();
                if (highest.idPlateforme) newId = highest.idPlateforme + 1;
            }

            await addDoc(collection(db, "plateformes"), {
                idPlateforme: newId,
                libPlateforme: libPlateforme,
            });
            navigation.goBack();
        } catch (error) {
            console.error("Erreur :", error);
        }
    };

    const handleUpdate = async () => {
        try {
            if (!libPlateforme.trim()) {
                Alert.alert("Erreur", "Le nom de la plateforme est obligatoire");
                return;
            }
            const docRef = doc(db, "plateformes", plateforme.id);
            await updateDoc(docRef, { libPlateforme: libPlateforme });
            navigation.goBack();
        } catch (error) {
            console.error("Erreur :", error);
        }
    };

    const handleDelete = async () => {
        try {
            Alert.alert("Confirmation", "Supprimer cette plateforme ?", [
                { text: "Annuler" },
                {
                    text: "Supprimer",
                    style: "destructive",
                    onPress: async () => {
                        await deleteDoc(doc(db, "plateformes", plateforme.id));
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
            <Text style={styles.title}>{plateforme ? "Modifier la plateforme" : "Créer une plateforme"}</Text>
            
            <TextInput 
                style={styles.input} 
                value={libPlateforme} 
                onChangeText={setLibPlateforme} 
                placeholder="Nom de la plateforme" 
            />

            {plateforme ? (
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
