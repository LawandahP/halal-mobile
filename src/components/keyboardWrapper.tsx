import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useTheme } from "../../contexts/themeContext";
import { Colors } from "./styles";

interface KeyboardProps {
  children: any;
}

const KeyBoardWrapper = (props: KeyboardProps) => {
  const { theme } = useTheme();
  let activeColors = Colors[theme.mode];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: activeColors.primary }}
    >
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {props.children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyBoardWrapper;
