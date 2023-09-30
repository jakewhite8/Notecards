import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { 
  Button,
  ListItem,
  ListItemProps,
} from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient'
import { useContext } from 'react';
import { UsernameReducerContext } from '../helpers/UsernameReducer';
import { StackParamList } from '../types/DataTypes';
import SampleNotecards from '../helpers/SampleNotecards';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const notecards = SampleNotecards; 

// Used to type check the Screen components.
// This allows us to type check route names and params used by
// the navigate and push functions, etc.
type HomeProps = NativeStackScreenProps<StackParamList, 'Home'>;

// navigation and route prop is passed in to every screen component
function Home( { navigation }: HomeProps) {

  const { UsernameState } = useContext(UsernameReducerContext);
  const listItemProps = {};

  return (
    <>
      <View style={styles.container}>
        <Text>Hello {UsernameState.username}</Text>
      </View>
      <View style={{ paddingVertical: 8 }}>
        {notecards.map((notecard, i) => (
          <ListItem
            {...(listItemProps as ListItemProps)}
            key={i}
            linearGradientProps={{
              colors: notecard.linearGradientColors,
              start: [1, 0],
              end: [0.2, 0],
            }}
            ViewComponent={LinearGradient}
            containerStyle={{
              marginHorizontal: 16,
              marginVertical: 8,
              borderRadius: 8,
            }}
            onPress={() =>
              navigation.navigate('Details', {name: notecard.name + ' Notecards', card: notecard})
            }
          >
            <ListItem.Content>
              <ListItem.Title
                style={{ color: 'white', fontWeight: 'bold' }}
              >
                {notecard.name}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron color="white" />
          </ListItem>
        ))}
      </View>
    </>
  )
}

export default Home;