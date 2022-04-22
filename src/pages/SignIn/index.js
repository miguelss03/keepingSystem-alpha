import React, { useState, useContext } from 'react';
import {
  Text, View, StyleSheet, Image, TextInput,
  TouchableOpacity, KeyboardAvoidingView, ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';

export default function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);

  function handleLogin() {
    signIn(email, password);
  }

  return (
    <View style={styles.background}>
      <KeyboardAvoidingView style={styles.container}>
        
          <Image
            style={styles.logo}
            source={require('../../../assets/ksy_logo2.jpeg')}
          />

          <Text style={styles.txt}>
            KSY - Keeping System
          </Text>

          <View style={styles.areaInput}>
            <TextInput
              style={styles.input}
              placeholder="Email"
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
              placeholderTextColor="#747474"
              autoCorrect={false}
              autoCapitalize="none"
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          <TouchableOpacity
            style={styles.subButton}
            onPress={handleLogin}
          >
            <Text style={styles.subTxt}>Acessar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.link}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={styles.linkTxt}>Criar uma conta!</Text>
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

  txt: {
    fontSize: 22,
    fontWeight: '700',
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
