import { useState } from "react";
import {
  BtnText,
  Colors,
  Container,
  ExtraText,
  ExtraView,
  FormArea,
  InnerContainer,
  Line,
  MsgBox,
  PageLogo,
  PageTitle,
  StyledButton,
  SubTitle,
  TextLink,
  TextLinkContent,
} from "../components/styles";

// import { Fontisto } from '@expo/vector-icons'
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../../contexts/themeContext";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contexts/authContext";
// import { Text } from 'react-native'
// import Loader from '../components/loader'
// import KeyBoardWrapper from '../components/keyboardWrapper'

import SocialLogins from "../components/socialLogins";
import CustomInput from "../components/CustomInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CustomButton from "../components/CustomButton";

interface LoginProps {
  navigation: any;
}

type FormValues = {
  username: string;
  password: string;
};

const initialVals: FormValues = {
  username: "",
  password: "",
};

const Login = (props: LoginProps) => {
  const { t } = useTranslation();
  const { login, errors, isLoading } = useAuth();

  const { theme } = useTheme();
  let activeColors = Colors[theme.mode];

  const form = useForm<FormValues>({
    defaultValues: initialVals,
  });
  const { handleSubmit, setError, control } = form;

  const onSubmitLogin: SubmitHandler<FieldValues> = async (data) => {
    login(data, setError);
  };

  return (
    <Container style={{ backgroundColor: activeColors.primary }}>
      <StatusBar style={theme.mode === "dark" ? "light" : "dark"} />
      <InnerContainer>
        {/* <PageLogo resizeMode="cover" source={require('./../assets/images/image1.jpg')} /> */}
        <PageTitle>Halal</PageTitle>
        <SubTitle style={{ color: activeColors.light }}>{t("login")}</SubTitle>

        <FormArea>
          <CustomInput
            icon="person"
            name="username"
            placeholder={t("username")}
            control={control}
            rules={{ required: `${t("username")} ${t("is_required")}` }}
          />

          <CustomInput
            icon="lock"
            name="password"
            placeholder={t("password")}
            initialSecureTextEntry
            control={control}
            rules={{
              required: `${t("password")} ${t("is_required")}`,
              minLength: {
                value: 3,
                message: `${t("password")} ${t("password_requirements")}`
              },
            }}
          />

          <CustomButton
            text={t("login")}
            onPress={handleSubmit(onSubmitLogin)}
            type={"PRIMARY"}
            bgColor={""}
            fgColor={""}
            loading={isLoading}
          />

          {errors?.non_field_errors && (
            <MsgBox style={{ color: "red" }}>
              {errors?.non_field_errors[0]}
            </MsgBox>
          )}

          <Line />

          <MsgBox style={{ color: activeColors.light, marginBottom: 20 }}>
            {t("or sign up with...")}
          </MsgBox>

          <SocialLogins />

          <ExtraView>
            <ExtraText style={{ color: activeColors.light }}>
              {t("dont_have_an_account")}
            </ExtraText>
            <TextLink onPress={() => props.navigation.navigate("SignUp")}>
              <TextLinkContent> {t("sign_up")}</TextLinkContent>
            </TextLink>
          </ExtraView>
        </FormArea>
      </InnerContainer>
    </Container>
  );
};

export default Login;
