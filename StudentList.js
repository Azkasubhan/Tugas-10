// StudentList.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadStudents() {
      try {
        const col = collection(db, "Mahasiswa");

        const snap = await getDocs(col);
        const arr = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (mounted) setStudents(arr);
      } catch (e) {
        console.log("Firestore get error:", e);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadStudents();

    return () => { mounted = false; };
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} />;

  if (!students.length)
    return <Text style={{ padding: 20 }}>Tidak ada data mahasiswa.</Text>;

  return (
    <FlatList
      data={students}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 12, borderBottomWidth: 1, borderColor: "#eee" }}>
          <Text style={{ fontWeight: "bold" }}>{item.Nama}</Text>
          <Text>Fakultas: {item.Fakultas}</Text>
          <Text>NIM: {item.NIM}</Text>
          <Text>Prodi: {item.Program_Studi}</Text>
        </View>
      )}
    />
  );
}

