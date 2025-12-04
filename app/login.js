import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { login } from "../AuthService";
import { router } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const doLogin = async () => {
    const res = await login(email, password);
    if (!res.ok) return Alert.alert("Login gagal", res.error);
    router.replace("/home");
  };

  return (
    <View style={{ flex:1, padding:20 }}>
      <Text style={{ fontSize:22 }}>Login</Text>

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

      <Button title="Login" onPress={doLogin} />
      <Button title="Register" onPress={() => router.push("/register")} />
    </View>
  );
}
