import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { getUserFromMMKV, logout } from "../AuthService";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const userData = await getUserFromMMKV();
    setUser(userData);
  }

  return (
    <View style={{ flex:1, padding:20 }}>
      <Text style={{ fontSize:20 }}>Hi, {user?.email || "Guest"}</Text>

      <Button title="Lihat Data Mahasiswa" onPress={() => router.push("/students")} />
      <Button 
        title="Logout" 
        color="red" 
        onPress={async () => { 
          await logout(); 
          router.replace("/login"); 
        }} 
      />
    </View>
  );
}
