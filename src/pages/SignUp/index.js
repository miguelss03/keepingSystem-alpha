import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import {
  View, Text, TouchableOpacity, Image,
  TextInput, StyleSheet, KeyboardAvoidingView
} from 'react-native';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const { signUp } = useContext(AuthContext);

  function handleSignUp() {
    signUp(email, password, nome);
  }

  return (
    <View style={styles.background}>
      <KeyboardAvoidingView style={styles.container}>

        <Image
          style={styles.logo}
          source={require('../../../assets/ksy_logo2.jpeg')}
        />
        <Text style={styles.txt1}>
          KSY
        </Text>
        <Text style={styles.txt}>
          Preencha os campos a baixo
        </Text>

        <View style={styles.areaInput}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#747474"
            autoCorrect={false}
            autoCapitalize="none"
            value={nome}
            onChangeText={(text) => setNome(text)}
          />
        </View>

        <View style={styles.areaInput}>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#747474"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.areaInput}>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            autoCorrect={false}
            placeholderTextColor="#747474"
            autoCapitalize="none"
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>


        <TouchableOpacity
          style={styles.subButton}
          onPress={handleSignUp}
        >
          <Text style={styles.subTxt}>Finalizar!</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  logo: {
    marginBottom: 45,
    height: 180,
    width: 180
  },
  txt1:{
    fontSize: 22,
    fontWeight: '600',
    top: -30,
    color: '#000'
  },

  txt: {
    fontSize: 18,
    marginBottom: 10,
    top: -15,
    color: '#000'
  },

  areaInput: {
    flexDirection: 'row'
  },

  input: {
    textAlign: 'center',
    width: 320,
    height: 55,
    backgroundColor: "#f4f4f4",
    elevation: 0,
    fontSize: 17,
    color: "#000000",
    marginBottom: 15,
    padding: 10,
    borderRadius: 22,
  },

  subButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2ADC5C',
    width: 320,
    height: 58,
    borderRadius: 22,
    marginTop: 5
  },

  subTxt: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: '700'
  },

  link: {
    marginTop: 35,
    marginBottom: 10
  },

  linkTxt: {
    color: "#000",
    fontSize: 16.5
  }
});