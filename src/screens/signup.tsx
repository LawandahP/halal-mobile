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
  SubTitle,
  TextLink,
  TextLinkContent,
} from "../components/styles";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";
import KeyboardWrapper from "../components/keyboardWrapper";
import { useTheme } from "../../contexts/themeContext";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../config/asyncStorage";
import axios from "axios";
import CustomInput from "../components/CustomInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { setFormErrors } from "../../contexts/authContext";
import CustomButton from "../components/CustomButton";
import { getLocales } from "expo-localization";

interface SignUpProps {
  navigation?: any;
}

type FormValues = {
  full_name: string;
  username: string;
  phone_number: any;
  email: string;
  // dateOfBirth: dob,
  password: string;
};

const SignUp = (props: SignUpProps) => {
  const { theme } = useTheme();
  let activeColors = Colors[theme.mode];

  const { t } = useTranslation();

  const [date, setDate] = useState(new Date(2001, 3, 6));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [dob, setDob] = useState<Date>();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setDob(currentDate.toDateString());
    hideDatePicker();
  };

  const initialVals: any = {
    full_name: "",
    username: "",
    phone_number: "",
    email: "",
    // dateOfBirth: dob,
    password: "",
  };

  const form = useForm<FormValues>({
    defaultValues: initialVals,
  });
  const { handleSubmit, setError, control } = form;
  const [loading, setLoading] = useState(false);

  const [notify, setNotify] = useState<string | undefined>();
  const [messageType, setMessageType] = useState<string | undefined>();

  const [userInfo, setUserInfo] = useState();

  const signup: SubmitHandler<FieldValues> = async (data) => {
    const url = `${BASE_URL}/signup/`;
    const deviceLanguage = getLocales()[0].languageCode;
    setLoading(true);
    await axios
      .post(url, data, {
        headers: {
          'Accept-Language': deviceLanguage,
        }})
      .then((res) => {
        setLoading(false);
        let userInfo = res.data.data;
        setUserInfo(userInfo);

        const { message, status } = userInfo;
        if (status == "SUCCESS") {
          props.navigation.navigate("Login");
          Alert.alert(message);
        }
      })
      .catch((e) => {
        console.log(`error ${e}`);
        const errors = e?.response?.data.detail;
        setFormErrors(errors, setError);
        if (e?.response?.status === 500) {
          setNotify(
            "Oops. Something went wrong, feel free to contact us if the problem persists"
          );
        }
      });
    setLoading(false);
  };

  return (
    // <KeyboardWrapper>
    <Container style={{ backgroundColor: activeColors.primary }}>
      <StatusBar
        barStyle={theme.mode === "dark" ? "light-content" : "dark-content"}
      />
      <InnerContainer>
        <PageTitle>Halal</PageTitle>
        <SubTitle style={{ color: activeColors.light }}>
          {t("create_account")}
        </SubTitle>

        <FormArea>
          {/* <PageLogo resizeMode="cover" source={require('./../assets/images/image1.jpg')} /> */}

          {isDatePickerVisible && (
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          )}

          <CustomInput
            icon="person"
            name="full_name"
            placeholder={t("full_name")}
            control={control}
            rules={{ required: `${t("full_name")} ${t("is_required")}`}}
          />

          <CustomInput
            icon="person"
            name="username"
            placeholder={t("username")}
            control={control}
            rules={{ required: `${t("username")} ${t("is_required")}`}}
          />

          <CustomInput
            icon="mail"
            name="email"
            placeholder={t("email")}
            control={control}
            keyboardType="email-address"
          />

          <CustomInput
            icon="device-mobile"
            name="phone_number"
            placeholder={t("phone_number")}
            control={control}
            keyboardType="phone-pad"
            rules={{ required: `${t("phone_number")} ${t("is_required")}`}}
          />

          <CustomInput
            icon="lock"
            name="password"
            placeholder={t("password")}
            initialSecureTextEntry
            control={control}
            rules={{
              required: `${t("password")} ${t("is_required")}` ,
              minLength: {
                value: 3,
                message: `${t("password")} ${t("password_requirements")}`,
              },
            }}
          />

          <CustomButton
            text={t("sign_up")}
            onPress={handleSubmit(signup)}
            type={"PRIMARY"}
            bgColor={""}
            fgColor={""}
            loading={loading}
          />

          <ExtraView>
            <ExtraText style={{ color: activeColors.light }}>
              {t("have_an_account")}
            </ExtraText>
            <TextLink onPress={() => props.navigation.navigate("Login")}>
              <TextLinkContent> {t("login")}</TextLinkContent>
            </TextLink>
          </ExtraView>
        </FormArea>
      </InnerContainer>
    </Container>
    // </KeyboardWrapper>
  );
};

// 0506838517
export default SignUp;
