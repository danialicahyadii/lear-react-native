import { createContext, useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


export const BooksContext = createContext();

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);
  const { user } = useUser();

  async function fetchBooks() {
    try {
      const authToken = await AsyncStorage.getItem('access_token');
      const response = await axios.get('https://stock-opname.devkftd.my.id/api/pid-mm', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setBooks(response.data)
      
    } catch (error) {
      console.error(error.message);
    }
  }

  async function fetchBookById(id) {
    try {
        const authToken = await AsyncStorage.getItem('access_token');
        const response = await axios.get(`https://stock-opname.devkftd.my.id/api/pid-mm/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        
        return response.data
    } catch (error) {
      console.error(error.message);
    }
  }

  async function createBook(data) {
    try {
      console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function deleteBook(id) {
    try {
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    if(user){
      fetchBooks()
    } else {
      setBooks([])
    }
  }, [user])

  return (
    <BooksContext.Provider
      value={{ books, fetchBooks, fetchBookById, createBook, deleteBook }}
    >
      {children}
    </BooksContext.Provider>
  );
}
