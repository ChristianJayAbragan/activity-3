import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
} from "react-native";
import React from "react";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import Logo from "../../../assets/images/logo.png";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import axios from 'axios'; // Added import

const Register = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const { control, handleSubmit, watch } = useForm();

  const pass = watch("password");

  const onBackToLogin = () => {
    navigation.navigate("Login");
  };

  const onRegisterPressed = async (data) => {
    try {
      const response = await axios.post('http://192.168.1.2/backend/register.php', {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      console.log(response.data); 
      navigation.navigate('Login');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const EMAIL_REGEX = /[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}/;

  return (
    <View style={styles.container}>
      <Image
        style={[styles.logo, { height: height * 0.3 }]}
        source={Logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Create an account</Text>

      <Input
        name="username"
        placeholder="Username"
        control={control}
        rules={{
          required: "Username is required",
          minLength: {
            value: 4,
            message: "Username should be at least 4 characters minimum",
          },
          maxLength: {
            value: 24,
            message: "Username should be only 24 characters long",
          },
        }}
      />

      <Input
        name="email"
        placeholder="Email"
        control={control}
        rules={{
          required: "Email is required",
          pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
        }}
      />
      <Input
        name="password"
        placeholder="Password"
        control={control}
        secureTextEntry
        rules={{
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password should be at least 8 characters long",
          },
        }}
      />
      <Input
        name="confirm-password"
        placeholder="Confirm Password"
        control={control}
        secureTextEntry
        rules={{
          validate: (value) => value === pass || "Password do not match",
        }}
      />

      <Button
        text="Register"
        type="PRIMARY"
        onPress={handleSubmit(onRegisterPressed)}
      />
      <Button
        text="Already have an account? Log in here."
        onPress={onBackToLogin}
        type="TERTIARY"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#2A2F4F",
    borderRadius: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: "300",
    color: "white",
  },

  logo: {
    width: "70%",
    maxWidth: 300,
    height: 100,
  },
});

export default Register;
