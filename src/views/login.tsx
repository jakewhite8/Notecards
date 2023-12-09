import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TextInput, View } from 'react-native';
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
    if (validEmail(userEmail)) {
      dispatch({type: 'SET_USER', payload: {name: userEmail, id: 1}})
      navigation.reset({
        index: 0,
        routes: [{ name: 'DrawerNavigator' }]
      });
    } else {
      setUserCredentialsError(true)
    }
    setLoginLoading(false)   
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
      </View> 
    </View> 
  )
}

export default Login;