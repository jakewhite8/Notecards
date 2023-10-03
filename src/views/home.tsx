import { useContext, useState } from 'react';
import { Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ListItem,
  ListItemProps,
  SearchBar
} from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient'
import { UsernameReducerContext } from '../helpers/UsernameReducer';
import { StackParamList } from '../types/DataTypes';
import SampleNotecards from '../helpers/SampleNotecards';
import GlobalStyles from '../styles/GlobalStyles';

const styles = GlobalStyles;

const notecards = SampleNotecards;

// Used to type check the Screen components.
// This allows us to type check route names and params used by
// the navigate and push functions, etc.
type HomeProps = NativeStackScreenProps<StackParamList, 'Home'>;

// navigation and route prop is passed in to every screen component
function Home( { navigation }: HomeProps) {

  const { UsernameState } = useContext(UsernameReducerContext);
  const [filterString, setFilterString] = useState('');
  const listItemProps = {};

  return (
    <>
      <View style={styles.container}>
        <Text>Hello {UsernameState.username}</Text>
        <Text>Current filter: {filterString}</Text>
      </View>
      <View style={{ paddingVertical: 8 }}>
        <SearchBar
          value={filterString}
          onChangeText={setFilterString}
          placeholder="Filter by title"
        />
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