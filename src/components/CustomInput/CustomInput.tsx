import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import {
  useTheme,
} from "../../../contexts/themeContext";
import { Colors, IconButton, InputIcon, StyledTextInput } from "../styles";
import { Ionicons, Octicons } from "@expo/vector-icons";

interface CustomInputProps {
  control: any;
  name: string;
  placeholder: string;
  rules?: any;
  icon?: any;
  keyboardType?: any;
  initialSecureTextEntry?: boolean;
}

const CustomInput = ({
  control,
  name,
  icon,
  rules = {},
  keyboardType,
  placeholder,
  initialSecureTextEntry,
}: CustomInputProps) => {
  
  const { theme } = useTheme()
  let activeColors = Colors[theme.mode];

  const [secureTextEntry, setSecureTextEntry] = useState(
    initialSecureTextEntry
  );

  const handleShowPassword = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: activeColors.secondary,
                borderWidth: error ? 1 : 0,
                borderColor: error ? "red" : "",
              },
            ]}
          >
            <InputIcon>
              <Octicons name={icon} size={27} color={Colors.brand} />
              {/* <Octicons name={icon} size={props.isSearch ? 20 : 30} color={Colors.brand}/> */}
            </InputIcon>

            <StyledTextInput
              keyboardType={keyboardType}
              placeholderTextColor={activeColors.darkLight}
              style={{
                color: activeColors.light,
                flex: 1,
              }}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
            />
            {initialSecureTextEntry && (
              <IconButton onPress={handleShowPassword}>
                <Ionicons
                  size={30}
                  color={Colors.darkLight}
                  name={secureTextEntry ? "md-eye-off" : "md-eye"}
                />
              </IconButton>
            )}
          </View>

          {error && (
            <Text style={{ color: "red", fontFamily:'outfit', marginTop: -10, marginBottom: 10 }}>{error?.message || "Error"}</Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  error: {
    color: "red",
    marginTop: -8,
    marginBottom: 10,
  },
  label: {
    marginVertical: 5,
    fontSize: 16,
  },
  inputContainer: {
    height: 60,
    flexDirection: "row",
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
});

export default CustomInput;
