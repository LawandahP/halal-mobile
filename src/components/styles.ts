import styled from "styled-components/native";
import Constants from 'expo-constants'


const StatusBarHeight = Constants.statusBarHeight;

export const Colors: any = {

    light: {
        primary: "#ffff",
        secondary: "#E5E7EB",
        tertiary: "#1f2937",
        darkLight: "#9ca3af",
        brand: "#0081e9",
        light: "#333000"
    },

    dark: {
        primary: "#1f2937",
        secondary: "#111827",
        tertiary: "#1f2937",
        darkLight: "#9ca3af",
        brand: "#0081e9",
        light: "#ffff"
    },
    primary: "#fffff",
    secondary: "#E5E7EB",
    tertiary: "#1f2937",
    darkLight: "#9ca3af",
    brand: "#0081e9",
    white: "#ffffff",
    black: "#000000",
    lightGray: "#EDEDED"
};

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;


export const Container = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight + 30}px;
    /* background-color: ${primary}; */
`

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
    justify-content: center;
`
export const PageLogo = styled.Image`
    width: 250px;
    height: 250px;
`

export const PageTitle = styled.Text<{welcome?: boolean}>`
    font-size: 30px;
    text-align: center;
    font-family: 'outfit-bold';
    color: ${brand};
    /* padding: 10px; */

    ${(props) => props.welcome && `
        margin-bottom: 35px;
    `}
`
export const SubTitle = styled.Text<{welcome?: boolean}>`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-family: 'outfit-medium';
    color: ${tertiary};

    ${(props) => props.welcome && `
        margin-bottom: 5px;
        font-weight: normal;
    `}
`




export const FormArea = styled.View`
    width: 90%;   
`

export const StyledTextInput = styled.TextInput`
    padding-left: 25px;
    font-size: 15px;
    font-family: 'outfit';
`

export const InputLabel = styled.Text`
    font-size: 16px;
    text-align: left;
`

export const InputIcon = styled.View`
    left: 15px;
    margin-right: 10px;
    z-index: 1;
`

export const IconButton = styled.TouchableOpacity`
    right: 15px;
    z-index: 1;
`

export const StyledButton = styled.TouchableOpacity<{google?: boolean}>`
    padding: 15px;
    background-color: ${brand};
    justify-content: center;
    border-radius: 5px;
    align-items: center;
    /* margin-vertical: 5px; */
    height: 60px;

    ${(props) => props.google && `
        background-color: ${green};
        flex-direction: row;
        justify-content: center;
    `}
`

export const BtnText = styled.Text<{google?: boolean}>`
    color: ${primary};
    font-size: 16px;   
    font-family: 'outfit';
    
    ${(props) => props.google && `
        padding: 0 25px;
    `}
`

export const MsgBox = styled.Text<{type?: boolean}>`
    text-align: center;
    font-family: 'outfit';
    font-size: 14px;
    color: ${(props) => (props.type ? green : red)};
    margin-bottom: 10px;
`

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${darkLight};
    margin: 10px 0 10px;
`

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px;
`

export const ExtraText = styled.Text`
    justify-content: center;
    align-content: center;
    font-size: 15px;
    font-family: 'outfit';
`

export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`

export const TextLinkContent = styled.Text`
    color: ${brand};
    font-size: 15px;
    font-family: 'outfit';
`


// Welcome Screen

export const WelcomeContainer = styled.SafeAreaView`
    flex: 1;
    margin-top: 20;
`

export const Avatar = styled.Image`
    width: 100px;
    height: 100px;
    margin: auto;
    border-radius: 50px;
    border-width: 2px;
    border-color: ${secondary};
    margin-bottom: 10px;
    margin-top: 10px;
`

export const WelcomeImage = styled.Image`
    height: 50%;
    width: 120%;
`
