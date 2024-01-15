import React, { useContext, useEffect } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Colors } from "./styles";

import OpacityButton from "./opacityButton";
import { ThemeContext, ThemeContextValue } from "../../contexts/themeContext";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contexts/authContext";

interface DrawerProps {}

const CustomDrawer = (props: DrawerProps) => {
  const { t } = useTranslation();
  const { logout, userInfo, getUserInfo } = useAuth();

  const { theme } = useContext<ThemeContextValue>(ThemeContext);
  let activeColors = Colors[theme.mode];

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: activeColors.primary }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: activeColors.primary }}
      >
        <ImageBackground
          style={{ padding: 20 }}
          source={require("../assets/images/cleaning1.jpg")}
        >
          <Image
            style={styles.profileImage}
            source={require("../assets/images/image1.jpg")}
          />
          <Text style={{ color: activeColors.brand, fontSize: 18 }}>
            {userInfo?.full_name}
          </Text>

          <Text style={{ color: activeColors.brand }}>Client</Text>
        </ImageBackground>

        <View style={{ flex: 1, paddingTop: 20 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View
        style={{
          padding: 20,
          backgroundColor: activeColors.primary,
          borderTopWidth: 1,
          borderTopColor: activeColors.darkLight,
        }}
      >
        <OpacityButton icon="share-social-outline" label={t("share_app")} />
        <OpacityButton
          onPress={() => logout()}
          icon="exit-outline"
          label={t("sign_out")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
});
export default CustomDrawer;
