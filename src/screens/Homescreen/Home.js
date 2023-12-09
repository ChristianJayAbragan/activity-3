import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/Buttons/Button";
import Logo from "../../../assets/images/logo.png";
import axios from 'axios'; // Added import

const Home = () => {
  const navigation = useNavigation();

  const { height } = useWindowDimensions();

  const onPressSignOut = () => {
    // Perform sign out action
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Image
        style={[styles.logo, { height: height * 0.3 }]}
        source={Logo}
        resizeMode="contain"
      />
      <Button text="Sign Out" type="TERTIARY" onPress={onPressSignOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#2A2F4F",
  },

  title: {
    fontSize: 30,
    fontWeight: "300",
    color: "white",
  },

  logo: {
    width: "70%",
    maxWidth: 300,
    height: 100,
  },
});

export default Home;
