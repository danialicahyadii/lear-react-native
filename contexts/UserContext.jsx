import axios from "axios";
import { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

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
      setToken(response.data.access_token);
      setUser(response.data);
    } catch (error) {
      throw Error(error);
    }
  }
  async function register(email, password) {}
  async function logout() {
    try {
      const response = await axios.post(
        "https://stock-opname.devkftd.my.id/api/logout-sanctum",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      console.log(response.data.message);

      // Kosongkan state user/token
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error("Logout gagal:", error || error.message);
    }
  }

  async function getInitialUserValue(){
    
    try {
      const authToken = await AsyncStorage.getItem('access_token');
      console.log(authToken);
      const response = await axios.get('https://stock-opname.devkftd.my.id/api/user', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUser(response);
    } catch (error) {
      setUser(null)
    } finally{
      setAuthChecked(true)
    }
  }

  useEffect(()=>{
      getInitialUserValue()
  }, [])

  return (
    <UserContext.Provider value={{ user, login, register, logout, authChecked }}>
      {children}
    </UserContext.Provider>
  );
}
