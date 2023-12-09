import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import Logo from "../../../assets/images/logo.png";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import axios from 'axios';

const LogIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onLoginPress = async (data) => {
    try {
      const response = await axios.post('http://192.168.1.2/backend/login.php', {
        username: data.username,
        password: data.password,
      });
  
      console.log('Backend Response:', response);
  
      if (!response.data.error) {
        console.log('Login successful');
        navigation.navigate('Home');
      } else {
        console.log('Login failed:', response.data.error);
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };
  
  

  const onForgotPasswordPressed = () => {
    navigation.navigate("Forgot Password");
  };

  const onDontHaveAccountPressed = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Image
        style={[styles.logo, { height: height * 0.3 }]}
        source={Logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Log in your account</Text>

      <Input
        name="username"
        placeholder="Username"
        control={control}
        rules={{ required: "Username is required" }}
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

      <Button
        text="Log In"
        type="PRIMARY"
        onPress={handleSubmit(onLoginPress)}
      />
      <Button
        text="Forgot Password?"
        type="TERTIARY"
        onPress={onForgotPasswordPressed}
      />
      <Button
        text="Don't have an account? Register here."
        onPress={onDontHaveAccountPressed}
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

export default LogIn;
