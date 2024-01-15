import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import { BASE_URL, getData, storedData } from "../config/asyncStorage";
import axios from "axios";
import { ErrorObject, UserInfoInterface } from "../constants/interface";
import { getLocales } from 'expo-localization';

type AuthContextType = {
    userInfo: UserInfoInterface
    setUserInfo: (value: UserInfoInterface) => void
    errors: any
    setErrors: (value: ErrorObject) => void
    message: string | undefined
    setMessage: (value: string) => void
    messageType: string | undefined
    setMessageType: (value: string) => void
    isLoading: boolean;
    setIsLoading?: (value: boolean) => void;
    userToken: string | null,
    setUseToken?: (value: string | null) => void,
    login: (credentials: any, setError: any) => void,
    logout: () => void,
    handleMessage: (message: string, type?: string) => void,
    getUserInfo: () => void
};
export const AuthContext = createContext<AuthContextType>({
    userInfo: {
        id: 1,
        full_name: "",
        username: "",
        email: "",
        phone_number: ""
    },
    setUserInfo: () => {},
    errors: undefined,
    setErrors: () => {},
    message: undefined,
    setMessage: () => {},
    messageType: undefined,
    setMessageType: () => {},
    isLoading: false,
    setIsLoading: () => {},
    userToken: null,
    setUseToken: () => {},
    login: () => {},
    logout: () => {},
    handleMessage: () => {},
    getUserInfo: () => {}
});


interface AuthProps {
    children: any
}



export function setFormErrors<T>(
    errors: {
      [key: string]: string | { [key: string]: string } | string[]
    },
    setError: any
  ) {
    if (errors && typeof errors === 'object') {
      Object.keys(errors).forEach((fieldName) => {
        const errorValue = errors[fieldName]
  
        if (Array.isArray(errorValue)) {
          // Handle direct error messages (array of strings)
          errorValue.forEach((directError) => {
            setError(fieldName as keyof T, {
              type: 'server',
              message: directError,
            })
          })
        } else if (typeof errorValue === 'object') {
          // Handle nested field errors (object with field names as keys and error messages as values)
          Object.keys(errorValue).forEach((nestedField) => {
            setError(`${fieldName}.${nestedField}` as keyof T, {
              type: 'server',
              message: errorValue[nestedField],
            })
          })
        } else {
          // If it's a single string, handle it as a direct error
          setError(fieldName as keyof T, {
            type: 'server',
            message: errorValue,
          })
        }
      })
    }
  }


export const AuthProvider = (props:AuthProps) => {
    const [ errors, setErrors ] = useState({detail: {}});
    
    const [message, setMessage] = useState<string | undefined>()
    const [messageType, setMessageType] = useState<string | undefined>()
    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState<string | null>(null as string | null);


    const handleMessage = (message: string, type = 'FAILED') => {
        setMessage(message)
        setMessageType(type)
    }

    const [ userInfo, setUserInfo] = useState<any>()

    const getUserInfo = async () => {
        try {
          const userInfo = await getData("userInfo")
          if (userInfo) {
            setUserInfo(userInfo)
          }
        } catch(e: any) {
          Alert.alert(`User not authenticated ${e}`)
        }
    }
       
    const login = async (credentials: any, setError: any) => {
        const deviceLanguage = getLocales()[0].languageCode;
        handleMessage("")
        console.log(credentials)
        setIsLoading(true)
        const url = `${BASE_URL}/login/`
        await axios.post(url, credentials, {
            headers: {
                'Accept-Language': deviceLanguage,
            }
        }).then(res => {
            let userInfo = res?.data?.data
            setIsLoading(false);
            setUserInfo(userInfo)
            storedData('userInfo', userInfo.user)

            const { token } = userInfo

            setUserToken(token)
            storedData('userToken', userToken);
            console.log(res?.data)
        }).catch(e => {
            console.log(`error ${JSON.stringify( e?.response?.data?.detail)}`)

            const errors = e?.response?.data?.detail
            setFormErrors(errors, setError)
            setErrors(e?.response?.data?.detail)
            setIsLoading(false);

            if (e?.response?.status === 500) {
                handleMessage("An error occurred. Check your network and try again")
            }
            
        })
        
        
       
    }


    const logout = () => {
        setUserToken(null)
        setIsLoading(true)
        AsyncStorage.removeItem('userToken')
        setIsLoading(false)
    }

    // const isLoggedIn = async () => {
    //     try {
    //         setIsLoading(true);
    //         let userToken = await getData('userToken')
    //         setUserToken(userToken)
    //         setIsLoading(false)
    //     } catch(e) {
    //         Alert.alert(`Error lil bitch ${e}`)
    //     }
        
    // }
    useEffect(() => {
        const checkLoggedInStatus = async () => {
            try {
                setIsLoading(true);
                let userToken = await getData('userToken')
                setUserToken(userToken)
                setIsLoading(false)
            } catch(e) {
                Alert.alert(`Error ${e}`)
            }
        }
        checkLoggedInStatus();
    }, [])
    

    // useEffect(() => {
    //     isLoggedIn()
    // }, [])

    return (
        <AuthContext.Provider 
            value={
                {
                    getUserInfo, userInfo, setUserInfo, errors, setErrors, login, logout, 
                    isLoading, userToken,
                    handleMessage, message, setMessage,
                    messageType, setMessageType
                }
            }>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
