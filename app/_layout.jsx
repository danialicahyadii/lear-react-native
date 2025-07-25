import { Slot, Stack } from "expo-router";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import { StatusBar } from "expo-status-bar";
import { UserProvider } from "../contexts/UserContext";
import { useUser } from "../hooks/useUser";

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  return (
    <UserProvider>
      <StatusBar value="auto" />
      {/* <View style={ { flex: 1 } }> */}
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.navBackground },
          headerTintColor: theme.title,
        }}
      >
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ title: "Home" }} />
      </Stack>
      {/* </View> */}
    </UserProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
