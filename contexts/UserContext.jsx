import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login(email, password) {
    try {
      const response = await axios.post(
        "http://stock-opname.devkftd.my.id/api/login-sanctum",
        {
          email: email,
          password: password,
        }
      );
      setUser(response.data);
    } catch (error) {
      throw Error(error);
    }
  }
  async function register(email, password) {}
  async function logout(token) {
    try {
      const response = await axios.post(
        "https://traco.kftd.co.id/api/logout-sanctum",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      console.log("Logout berhasil:", response);

      // Kosongkan state user/token
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error("Logout gagal:", error || error.message);
    }
  }

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}
