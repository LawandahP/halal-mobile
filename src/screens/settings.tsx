import React, { useContext, useEffect, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../components/styles";
import MainContainer from "../components/mainContainer";
import StyledText from "../components/settings/styledText";
import SettingsItem from "../components/settings/settingsItem";
import SettingsButton from "../components/settings/settingsButton";
import { ThemeContext, ThemeContextValue } from "../../contexts/themeContext";

// import { useTranslation } from 'react-i18next';
import { useTranslation } from "react-i18next";
// import i18n from '../i18n';
// import { storedData } from '../config/asyncStorage';
import { useAuth } from "../../contexts/authContext";

interface SectionProps {
  children: any;
}

const SettingsSection = (props: SectionProps) => {
  return (
    <View
      style={{
        borderRadius: 20,
        overflow: "hidden",
        marginTop: 10,
        marginBottom: 25,
      }}
    >
      {props.children}
    </View>
  );
};

interface SettingProps {
  navigation: any;
}

// Enable RTL support
// I18nManager.forceRTL(true);

const Settings = (props: SettingProps) => {
  const { t, i18n } = useTranslation();
  const { userInfo, getUserInfo, logout } = useAuth();

  const LANGUAGES = [
    { code: "en", label: "English" },
    { code: "ar", label: "عربي" },
  ];

  const { theme, updateTheme } = useContext<ThemeContextValue>(ThemeContext);
  let activeColors = Colors[theme.mode];

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: t("settings"),
    });
  });

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  useEffect(() => {
    getUserInfo();
    console.log(userInfo);
  }, []);

  return (
    <MainContainer>
      <View style={styles.container}>
        <Text style={{ color: activeColors.brand,  fontFamily:'outfit' }}>
          {t("user")}
        </Text>
        <SettingsSection>
          <SettingsItem label={t("name")}>
            <StyledText>{userInfo?.full_name}</StyledText>
          </SettingsItem>

          <SettingsItem label={t("date_joined")}>
            <StyledText>{userInfo?.created_at}</StyledText>
          </SettingsItem>
        </SettingsSection>

        <Text style={{ color: activeColors.brand, fontFamily:'outfit' }}>
          {t("theme_settings")}
        </Text>
        <SettingsSection>
          <SettingsButton
            onPress={() => updateTheme({ mode: "light", system: false })}
            label={t("light")}
            isActive={theme.mode === "light" && !theme.system}
            icon="lightbulb-on"
          />
          <SettingsButton
            onPress={() => updateTheme({ mode: "dark", system: false })}
            label={t("dark")}
            isActive={theme.mode === "dark" && !theme.system}
            icon="weather-night"
          />
          <SettingsButton
            onPress={() => updateTheme({ mode: "", system: true })}
            label={t("system")}
            isActive={theme.system}
            icon="theme-light-dark"
          />
        </SettingsSection>

        <Text style={{ color: activeColors.brand, fontFamily:'outfit' }}>
          {t("language_settings")}
        </Text>

        <SettingsSection>
          {LANGUAGES.map((language) => {
            const activeLanguage = i18n.language === language.code;
            return (
              <SettingsButton
                key={language.code}
                onPress={() => changeLanguage(language.code)}
                label={`${language.label}`}
                isActive={activeLanguage}
              />
            );
          })}
        </SettingsSection>
      </View>
      
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
  },
});
export default Settings;

