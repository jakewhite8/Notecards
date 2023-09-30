import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { useContext } from 'react';
import { UsernameReducerContext } from '../helpers/UsernameReducer';
import { StackParamList } from '../types/DataTypes';
import GlobalStyles from '../styles/GlobalStyles';

type CreateProps = NativeStackScreenProps<StackParamList, 'Create'>

const styles = GlobalStyles;

function Create ({ navigation }: CreateProps) {
  const { UsernameState } = useContext(UsernameReducerContext);


  return (
    <View style={styles.container}>
      <Text>Create Page</Text>
    </View>
  )
}

export default Create;