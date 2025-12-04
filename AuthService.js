import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { auth } from "./firebase";

// Simpan user ke AsyncStorage sebagai JSON string
export async function saveUserToMMKV(userObj) {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(userObj));
  } catch (e) {
    console.log("Error menyimpan user:", e);
  }
}

// Ambil user dari AsyncStorage
export async function getUserFromMMKV() {
  try {
    const raw = await AsyncStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

// Hapus user dari AsyncStorage
export async function removeUserFromMMKV() {
  try {
    await AsyncStorage.removeItem("user");
  } catch (e) {
    // Silent error handling
  }
}

// REGISTER
export async function register(email, password) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const u = { uid: res.user.uid, email: res.user.email };
    await saveUserToMMKV(u);
    return { ok: true, user: u };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

// LOGIN
export async function login(email, password) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const u = { uid: res.user.uid, email: res.user.email };
    await saveUserToMMKV(u);
    return { ok: true, user: u };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

// LOGOUT
export async function logout() {
  try {
    await signOut(auth);
    await removeUserFromMMKV();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}