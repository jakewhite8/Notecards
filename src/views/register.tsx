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

const styles = GlobalStyles;

type RegisterProps = NativeStackScreenProps<StackParamList, 'Register'>;

function Register( { navigation, route }: RegisterProps) {
  const { theme } = useTheme();
  const { state, dispatch } = useAppState();
  const {t, i18n} = useTranslation();
  const [ newUserEmail, setNewUserEmail ] = useState('');
  const [ newUserPassword, setNewUserPassword ] = useState('');
  const [ newUserPasswordConfirm, setNewUserPasswordConfirm ] = useState('');
  const [ newUserError, setNewUserError ] = useState(false);
  const [ createAccountLoading, setCreateAccountLoading ] = useState(false);

  const newUserEmailChange = (value: string) => {
    setNewUserError(false)
    setNewUserEmail(value)
  }

  const validEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const createAccount = () => {
    setCreateAccountLoading(true)
    if (validEmail(newUserEmail) && newUserPassword == newUserPasswordConfirm && newUserPassword.length > 2) {
      dispatch({type: 'SET_USER', payload: {name: newUserEmail, id: 1}})
      navigation.reset({
        index: 0,
        routes: [{ name: 'DrawerNavigator' }]
      });
    } else {
      setNewUserError(true)
    }
    setCreateAccountLoading(false)   
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
          onChangeText={(value) => newUserEmailChange(value)}
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