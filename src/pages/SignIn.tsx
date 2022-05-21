import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignIn = ({navigation}: SignInScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const handleSubmit = useCallback(() => {
    if (!email || !email.trim()) {
      Alert.alert('Invalid Email Address', 'Please enter valid email address');
    }
    if (!password || !password.trim()) {
      Alert.alert('Invalid Password', 'Please enter valid password');
    }
  }, [email, password]);

  const handleEmail = useCallback(text => {
    setEmail(text);
  }, []);

  const handlePassword = useCallback(text => {
    setPassword(text);
  }, []);

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          ref={emailRef}
          style={styles.input}
          value={email}
          placeholder="Enter your email"
          onChangeText={handleEmail}
          autoComplete="email"
          importantForAutofill="yes"
          keyboardType="email-address"
          blurOnSubmit={false}
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
        />
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          ref={passwordRef}
          style={styles.input}
          value={password}
          placeholder="Enter your password"
          onChangeText={handlePassword}
          autoComplete="password"
          importantForAutofill="yes"
          secureTextEntry
          onSubmitEditing={() => {
            handleSubmit();
          }}
        />
      </View>
      <View>
        <Pressable
          style={
            !email || !password
              ? styles.button
              : [styles.button, styles.buttonActive]
          }
          onPress={handleSubmit}
          disabled={!email || !password}>
          <Text style={styles.buttonText}>Log In</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={toSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  loginContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 24,
    lineHeight: 32,
    paddingVertical: 12,
  },
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingLeft: 5,
    paddingBottom: 5,
    fontSize: 18,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
  },
  button: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonActive: {
    backgroundColor: 'blue',
  },
});

export default SignIn;
