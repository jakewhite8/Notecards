import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, TextInput, View } from 'react-native';
import {
  Input,
  InputProps,
  useTheme
} from '@rneui/themed';
import { Input as BaseInput } from '@rneui/base';
import { StackParamList } from '../types/DataTypes'
import GlobalStyles from '../styles/GlobalStyles';
import { useAppState } from '../context/GlobalState';
import { useTranslation } from 'react-i18next';
import PrimaryButton from '../components/primaryButton'
import Welcome from '../components/welcomeHeader'
import * as SecureStore from 'expo-secure-store'
import AuthService from '../services/auth';
import { AxiosResponse } from 'axios';

const styles = GlobalStyles;

type LoginProps = NativeStackScreenProps<StackParamList, 'Login'>;

function Login( { navigation, route }: LoginProps) {
  const { theme } = useTheme();
  const { state, dispatch } = useAppState();
  const {t, i18n} = useTranslation();
  const [ userEmail, setUserEmail ] = useState('');
  const [ userPassword, setUserPassword ] = useState('');
  const [ userCredentialsError, setUserCredentialsError ] = useState(false);
  const [ loginLoading, setLoginLoading ] = useState(false);

  async function save(key: string, value: string) {
    await SecureStore.setItemAsync(key, value)
  }

  const userEmailChange = (value: string) => {
    setUserCredentialsError(false)
    setUserEmail(value)
  }

  const validEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const login = () => {
    setLoginLoading(true)
    if (validEmail(userEmail) && userPassword.length > 2) {
      const credentials = {
        email: userEmail,
        password: userPassword
      }
      AuthService.login(credentials)
        .then((response: AxiosResponse) => {
          const { id, name, username, email, token } = response.data
          const user = {
            id,
            name,
            username,
            email,
            token
          }
          dispatch({type: 'SET_USER', payload: user})
          // Save User data locally
          save('user', JSON.stringify(user))
          navigation.reset({
            index: 0,
            routes: [{ name: 'DrawerNavigator' }]
          });
          setLoginLoading(false)
        })
        .catch((error) => {
          console.error('Error loging in:', error);
          setUserCredentialsError(true)
          setLoginLoading(false)
        })
    } else {
      setUserCredentialsError(true)
      setLoginLoading(false)
    }
  }

  const inputProps = {}
  interface WrappedInputProps extends InputProps {
    ref?: React.RefObject<TextInput & BaseInput>;
  }

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.secondaryBackground}]}>
      <Welcome />
      <View style={[styles.container, {width: '75%'}]}>
        <Input
          {...(inputProps as WrappedInputProps)}
          style={[styles.inputFieldsStyle, {color: theme.colors.primaryText}]}
          onChangeText={(value) => userEmailChange(value)}
          label={t('email')}
          labelStyle={{color: theme.colors.primaryText}}
          inputContainerStyle={{borderColor:theme.colors.primaryText, width: '100%'}}
          />
        <Input
          secureTextEntry={true}
          {...(inputProps as WrappedInputProps)}
          style={[styles.inputFieldsStyle, {color: theme.colors.primaryText}]}
          onChangeText={setUserPassword}
          label={t('password')}
          labelStyle={{color: theme.colors.primaryText}}
          inputContainerStyle={{borderColor:theme.colors.primaryText, width: '100%'}}
          errorStyle={{ color: theme.colors.error }}
          errorMessage={userCredentialsError ? t('invalidCredentials') : false}
          />
        <PrimaryButton
          title={t('login')}
          onPressFunction={login}
          loading={loginLoading} >
        </PrimaryButton>
        <View style={{marginTop: 17}}>
          <Text
            style={{color: theme.colors.primaryText}}
            onPress={ () => navigation.navigate('Register') }>
            {t('createAccount')}
          </Text>
        </View>
      </View> 
    </View> 
  )
}

export default Login;