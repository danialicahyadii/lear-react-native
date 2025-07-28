import { FlatList, Pressable, StyleSheet } from "react-native";
import { useBooks } from "../../hooks/useBooks";

import Spacer from "../../components/Spacer";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedCard from "../../components/ThemedCard";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

const Books = () => {
  const { books } = useBooks();
  const router = useRouter();

  return (
    <ThemedView style={styles.container} safe={true}>
      <Spacer />
      <ThemedText title={true} style={styles.heading}>
        Your reading list
      </ThemedText>
      <Spacer />
      <FlatList
        data={books}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.list}
        renderItem={({item}) => (
          <Pressable onPress={() => router.push(`/books/${item}`)}>
            <ThemedCard style={styles.card}>
              <ThemedText style={styles.title}>{item}</ThemedText>
            </ThemedCard>
          </Pressable>
        )} 
      />
    </ThemedView>
  );
};

export default Books;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  list: {
    marginTop: 40
  },
  card: {
    width: "60%",
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
