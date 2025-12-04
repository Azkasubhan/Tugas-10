import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { getUserFromMMKV } from "../AuthService";

export default function Index() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const userData = await getUserFromMMKV();
    setUser(userData);
    setLoading(false);
  }

  if (loading) {
    return null;
  }
  
  if (user) {
    return <Redirect href="/home" />;
  }
  
  return <Redirect href="/login" />;
}
