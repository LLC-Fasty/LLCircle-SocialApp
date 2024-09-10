import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import { hp, wp } from "../helpers/common";
import { theme } from "../constants/theme";
import Button from "../components/Button";
import { useRouter } from "expo-router";

const welcome = () => {
  const router = useRouter();
  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Image
          style={styles.welcomeImage}
          source={require("../assets/images/WelSocial.png")}
        />
        <View style={{ gap: 20 }}>
          <Text style={styles.title}>LLCircle!</Text>
          <Text style={styles.punchline}>
            Let's Link togather like a Circle and make a Better Ecosystem.
          </Text>
        </View>
        <View style={styles.footer}>
          <Button
            title="Getting Started"
            buttonStyle={{ marginHorizontal: wp(3) }}
            onPress={() => router.push("signUp")}
          />
          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>Already have an account!</Text>
            <Pressable onPress={() => router.push("login")}>
              <Text style={styles.loginTextKick}>Sign In</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingHorizontal: wp(4),
  },
  welcomeImage: {
    height: hp(30),
    width: wp(100),
    alignSelf: "center",
    objectFit: "contain",
  },
  title: {
    color: theme.colors.text,
    textAlign: "center",
    fontSize: hp(4),
    fontWeight: theme.fonts.extraBold,
  },
  punchline: {
    color: theme.colors.textLight,
    textAlign: "center",
    paddingHorizontal: wp(10),
    fontSize: hp(1.7),
    fontWeight: theme.fonts.medium,
  },
  footer: {
    gap: 30,
    width: "100%",
  },
  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
  },
  loginText: {
    textAlign: "center",
    color: theme.colors.textLight,
    fontSize: hp(1.6),
  },
  loginTextKick: {
    textAlign: "center",
    color: theme.colors.primaryDark,
    fontSize: hp(1.6),
    fontWeight: theme.fonts.bold,
  },
});
