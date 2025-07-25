import axios from "axios";
import { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();
  
  async function login(email, password) {
    try {
      const response = await axios.post(
        "https://stock-opname.devkftd.my.id/api/login-sanctum",
        {
          email: email,
          password: password,
        }
      );
      await AsyncStorage.setItem('access_token', response.data.access_token);
      setUser(response.data.user);
      router.replace('/books');
    } catch (error) {
      throw Error(error);
    }
  }
  async function logout() {
    try {
      const authToken = await AsyncStorage.getItem('access_token');
      await axios.post(
        "https://stock-opname.devkftd.my.id/api/logout-sanctum",
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",
          },
        }
      );
      setUser(null);
      await AsyncStorage.removeItem('access_token');
    } catch (error) {
      console.error("Logout gagal:", error || error.message);
    }
  }
  async function getInitialUserValue(){
    try {
      const authToken = await AsyncStorage.getItem('access_token');
      const response = await axios.get('https://stock-opname.devkftd.my.id/api/user', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      setUser(null)
    } finally {
      setAuthChecked(true)
      
    }
  }

  useEffect(()=>{
      getInitialUserValue()
  }, [])

  return (
    <UserContext.Provider value={{ user, login, logout, authChecked }}>
      {children}
    </UserContext.Provider>
  );
}
