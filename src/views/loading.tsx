import { View, Text, ActivityIndicator } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../types/DataTypes';
import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';

type LoadingProps = NativeStackScreenProps<StackParamList, 'Loading'>;

function Loading({navigation, route}: LoadingProps) {
  const { theme, updateTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.secondaryBackground 
    }}
      >
      <Text style={{color:theme.colors.primaryText}}>{t('loading')}</Text>
      <ActivityIndicator size="large" color={theme.colors.primaryText}/>
    </View>
  )
}

export default Loading;