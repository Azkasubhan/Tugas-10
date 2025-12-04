import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { register } from "../AuthService";
import { router } from "expo-router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const doRegister = async () => {
    const res = await register(email, password);
    if (!res.ok) return Alert.alert("Register gagal", res.error);
    router.replace("/home");
  };

  return (
    <View style={{ flex:1, padding:20 }}>
      <Text style={{ fontSize:22 }}>Register</Text>

      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth:1, padding:8 }}
      />

      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth:1, padding:8 }}
      />

      <Button title="Register" onPress={doRegister} />
    </View>
  );
}
