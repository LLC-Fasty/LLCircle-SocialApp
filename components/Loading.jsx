import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from "react";
import { theme } from "../constants/theme";

const Loading = ({ size = "large", color = theme.colors.primary }) => {
  return (
    <View style={{ justifyContent: "center", alignContent: "center" }}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
