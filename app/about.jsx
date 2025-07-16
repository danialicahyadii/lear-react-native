import { Link } from 'expo-router'
import { StyleSheet, useColorScheme } from 'react-native'
import { Colors } from '../constants/Colors';

//components
import ThemedView from '../components/ThemedView'
import ThemedLogo from '../components/ThemedLogo'
import ThemedText from '../components/ThemedText'
import Spacer from '../components/Spacer'

const About = () => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ??  Colors.light;

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.title}>About Page</ThemedText>
            <Link href='/' style={styles.link}>
                <ThemedText>Back Home</ThemedText>
            </Link>
        </ThemedView>
    )
}

export default About

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    },
    link: {
        marginVertical: 10,
        borderBottomWidth: 1
    }
})