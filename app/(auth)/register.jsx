import { StyleSheet, Text, View } from 'react-native'

//themed components
import ThemedView from '../../components/ThemedView'
import ThemedLogo from '../../components/ThemedLogo'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'
import { Link } from 'expo-router'
import ThemedButton from '../../components/ThemedButton'

const Register = () => {
    const handleRegister = () => {
        alert('Register Berhasil')
        console.log('form register submitted')
    }
  return (
    <ThemedView style={styles.container}>

        <Spacer />
        <ThemedText title={true} style={styles.title}>
            Register to your Account
        </ThemedText>
        <ThemedButton onPress={handleRegister}>
            <Text style={{color: '#f2f2f2'}}>Register</Text>
        </ThemedButton>
        <Spacer height={100} />
        <Link href='/login'>
            <ThemedText style={{textAlign: 'center'}}>
                Login instead
            </ThemedText>
        </Link>

    </ThemedView>
  )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        textAlign: "center",
        fontSize: 18,
        marginBottom: 30
    },
})