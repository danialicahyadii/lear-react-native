import { StyleSheet, Text, View } from "react-native";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import { useUser } from "../../hooks/useUser";
import ThemedButton from "../../components/ThemedButton";

const Profile = () => {
  const { logout, user } = useUser();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.container2}>
        <ThemedText title={true} style={styles.heading}>
          Username : {user.username}
        </ThemedText>
        <ThemedText title={true} style={styles.heading}>
          Email          : {user.email}
        </ThemedText>
        <ThemedText title={true} style={styles.heading}>
          Name          : {user.name}
        </ThemedText>
         <ThemedText title={true} style={styles.heading}>
          Position     : {user.position}
        </ThemedText>
      </ThemedView>
      <Spacer/>

      <ThemedText style={styles.heading}>
        Time to start reading some books ...
      </ThemedText>
      <Spacer />

      <ThemedButton onPress={logout}>
        <Text style={{ color: "#f2f2f2" }}>Logout</Text>
      </ThemedButton>
    </ThemedView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    alignItems: "left",
    justifyContent: "left",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "left",
    justifyContent: "left"
  },
});
