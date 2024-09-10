import { ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { fetchNoticications } from "../../services/notificationService";
import { useAuth } from "../../contexts/AuthContext";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";
import { useRouter } from "expo-router";
import NotificationItem from "../../components/NotificationItem";
import Header from "../../components/Header";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getNotification();
  }, []);

  const getNotification = async () => {
    let res = await fetchNoticications(user.id);
    // console.log("notification: ", res);
    if (res.success) setNotifications(res.data);
  };

  return (
    <ScreenWrapper>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Header title="Notifications" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listStyle}
        >
          {notifications.map((item) => {
            return (
              <NotificationItem item={item} key={item?.id} router={router} />
            );
          })}
          {notifications.length == 0 && (
            <Text style={styles.noData}>No Notifications Yet</Text>
          )}
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
  },

  listStyle: {
    paddingVertical: 20,
    gap: 10,
  },
  noData: {
    fontSize: hp(1.8),
    fontWeight: theme.fonts.medium,
    color: theme.colors.text,
    textAlign: "center",
  },
});
