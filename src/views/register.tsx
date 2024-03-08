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
import PrimaryButton from '../components/primaryButton';
import AuthService from '../services/auth';
import { AxiosResponse } from 'axios';

const styles = GlobalStyles;

type RegisterProps = NativeStackScreenProps<StackParamList, 'Register'>;

function Register( { navigation, route }: RegisterProps) {
  const { theme } = useTheme();
  const { state, dispatch } = useAppState();
  const {t, i18n} = useTranslation();
  const [ newUserName, setNewUserName ] = useState('');
  const [ newUserUsername, setNewUserUsername ] = useState('');
  const [ newUserEmail, setNewUserEmail ] = useState('');
  const [ newUserPassword, setNewUserPassword ] = useState('');
  const [ newUserPasswordConfirm, setNewUserPasswordConfirm ] = useState('');
  const [ newUserError, setNewUserError ] = useState(false);
  const [ createAccountLoading, setCreateAccountLoading ] = useState(false);

  const removeErrorAndSetState = (value:string, changeStateFunction: (value: string) => void) => {
    setNewUserError(false)
    changeStateFunction(value)
  }

  const validEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const registerUser = async () => {
    const newUser = {
      "name": newUserName,
      "username": newUserUsername,
      "email": newUserEmail,
      "password": newUserPassword
    }
    AuthService.register(newUser)
      .then(function(response: AxiosResponse) {
        console.log(`Response: ${JSON.stringify(response.data)}`);
        // Set current User and navigate to Home page
        const { name, email, username, token, id } = response.data
        dispatch({type: 'SET_USER', payload: {
          id,
          name,
          email,
          username,
          token
        }})
        navigation.reset({
          index: 0,
          routes: [{ name: 'DrawerNavigator' }]
        });
        setCreateAccountLoading(false)
      })
      .catch(function(error) {
        console.error('Error fetching data:', error);
        setCreateAccountLoading(false) 
      });
  };

  const createAccount = () => {
    setCreateAccountLoading(true)
    if (
        newUserName.length > 2 &&
        newUserUsername.length > 2 &&
        validEmail(newUserEmail) &&
        newUserPassword == newUserPasswordConfirm &&
        newUserPassword.length > 2
        ) {
      registerUser()
    } else {
      setNewUserError(true)
      setCreateAccountLoading(false)
    }
  }

  const inputProps = {}
  interface WrappedInputProps extends InputProps {
    ref?: React.RefObject<TextInput & BaseInput>;
  }

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.secondaryBackground}]}>
      <View style={[styles.container, {width: '75%'}]}>
        <Input
          {...(inputProps as WrappedInputProps)}
          style={[styles.inputFieldsStyle, {color: theme.colors.primaryText}]}
          onChangeText={(value) => removeErrorAndSetState(value, setNewUserName)}
          label={t('name')}
          labelStyle={{color: theme.colors.primaryText}}
          inputContainerStyle={{borderColor:theme.colors.primaryText, width: '100%'}}
          />
        <Input
          {...(inputProps as WrappedInputProps)}
          style={[styles.inputFieldsStyle, {color: theme.colors.primaryText}]}
          onChangeText={(value) => removeErrorAndSetState(value, setNewUserUsername)}
          label={t('username')}
          labelStyle={{color: theme.colors.primaryText}}
          inputContainerStyle={{borderColor:theme.colors.primaryText, width: '100%'}}
          />
        <Input
          {...(inputProps as WrappedInputProps)}
          style={[styles.inputFieldsStyle, {color: theme.colors.primaryText}]}
          onChangeText={(value) => removeErrorAndSetState(value, setNewUserEmail)}
          label={t('email')}
          labelStyle={{color: theme.colors.primaryText}}
          inputContainerStyle={{borderColor:theme.colors.primaryText, width: '100%'}}
          />
        <Input
          secureTextEntry={true}
          {...(inputProps as WrappedInputProps)}
          style={[styles.inputFieldsStyle, {color: theme.colors.primaryText}]}
          onChangeText={setNewUserPassword}
          label={t('password')}
          labelStyle={{color: theme.colors.primaryText}}
          inputContainerStyle={{borderColor:theme.colors.primaryText, width: '100%'}}
          />
        <Input
          secureTextEntry={true}
          {...(inputProps as WrappedInputProps)}
          style={[styles.inputFieldsStyle, {color: theme.colors.primaryText}]}
          onChangeText={setNewUserPasswordConfirm}
          label={t('passwordConfirm')}
          labelStyle={{color: theme.colors.primaryText}}
          inputContainerStyle={{borderColor:theme.colors.primaryText, width: '100%'}}
          errorStyle={{ color: theme.colors.error }}
          errorMessage={newUserError ? t('createAccountError') : false}
          />
        <PrimaryButton
          title={t('createAccount')}
          onPressFunction={createAccount}
          loading={createAccountLoading} >
        </PrimaryButton>
      </View> 
    </View> 
  )
}

export default Register;