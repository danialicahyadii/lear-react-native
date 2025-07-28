import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import ThemedView from '../../../components/ThemedView'
import ThemedText from '../../../components/ThemedText'
import { useLocalSearchParams } from 'expo-router'
import { useBooks } from '../../../hooks/useBooks'
import { Colors } from '../../../constants/Colors'
import ThemedCard from '../../../components/ThemedCard'
import ThemedLoader from '../../../components/ThemedLoader'
import Spacer from '../../../components/Spacer'

const BookDetails = () => {
    const [book, setBook] = useState(null)
    const { id } = useLocalSearchParams();
    const { fetchBookById } = useBooks();

    useEffect(() => {
        async function loadBook(){
            const bookData = await fetchBookById(id)
            setBook(bookData);
        }
        loadBook()
    },[id])

    if(!book){
        return(
            <ThemedView safe={true} style={styles.container}>
                <ThemedLoader />
            </ThemedView>
        )
    }
    
    return (
        <ThemedView safe={true} style={styles.container}>
            <Spacer />
            <ThemedText title={true} style={styles.heading}>
                Material PID : {id}
            </ThemedText>
            <FlatList
                data={book}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
                renderItem={({item}) => (
                <Pressable onPress={() => router.push(`/books/${item.id}`)}>
                    <ThemedCard style={styles.card}>
                    <ThemedText style={styles.title}>{item.material.desc_material}</ThemedText>
                    <ThemedText style={styles.title}>{item.batch} - {item.sloc}</ThemedText>
                    </ThemedCard>
                </Pressable>
                )} 
            />
        </ThemedView>
    )
}

export default BookDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
      },
      heading: {
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",
        marginBottom: 10,
      },
      list: {
        marginTop: 1
      },
      card: {
        width: "90%",
        marginHorizontal: "5%",
        marginVertical: 10,
        padding: 10,
        paddingLeft: 14,
        borderLeftColor: Colors.primary,
        borderLeftWidth: 4
      },
      title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
      },
});