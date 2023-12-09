import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import axios from 'axios'; 

const Forgotpassword = () => {
  const navigation = useNavigation();

  const { control, handleSubmit } = useForm();

  const EMAIL_REGEX = /[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}/;

  const onContinuePressed = async (data) => {
    try {
      const response = await axios.post('http://192.168.1.2/backend/forgotpassword.php', {
        email: data.email,
      });
      console.log(response.data); 
      navigation.navigate('Reset Confirmation');
    } catch (error) {
      console.error('Forgot password failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password?</Text>
      <Input
        name="Enter Email"
        placeholder="Enter Email"
        control={control}
        rules={{
          required: "Email is required",
          pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
        }}
      />
      <Button
        text="Continue"
        type="PRIMARY"
        onPress={handleSubmit(onContinuePressed)}
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
});

export default Forgotpassword;
