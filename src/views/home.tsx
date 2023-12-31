import { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ListItem,
  ListItemProps,
  SearchBar,
  Button,
  useTheme,
} from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient'
import { StackParamList, NotecardData } from '../types/DataTypes';
import SampleNotecards from '../helpers/SampleNotecards';
import TypeScriptNotecards from '../helpers/TypeScriptNotecards';
import GlobalStyles from '../styles/GlobalStyles';
import { useAppState } from '../context/GlobalState';
import { useTranslation } from 'react-i18next';
import PrimaryButton from '../components/primaryButton';
import Welcome from '../components/welcomeHeader';

const styles = GlobalStyles;

const notecards = SampleNotecards;

// Used to type check the Screen components.
// This allows us to type check route names and params used by
// the navigate and push functions, etc.
type HomeProps = NativeStackScreenProps<StackParamList, 'Home'>;

// navigation and route prop is passed in to every screen component
function Home( { navigation }: HomeProps) {
  const { theme, updateTheme } = useTheme();

  const [filterString, setFilterString] = useState('');
  const [activeNotecards, setActiveNotecards] = useState(notecards);
  const listItemProps = {};

  const { state, dispatch } = useAppState();
  const {t, i18n} = useTranslation();

  const loadDetailsPage = (notecard: NotecardData) => {
    // Retrieve selected notecards - temporarily using TypeScriptNotecards

    // load selected notecard into Global State
    dispatch({
      type: 'UPDATE_CURRENT_NOTECARDSET',
      payload: {
        title: notecard.name,
        notecards: TypeScriptNotecards.notecards
      }
    })
    navigation.navigate('Details', {name: `${notecard.name} ${t('notecardSet')}`, card: notecard})
    setFilterString('')
    setActiveNotecards(notecards)
  }

  const filterNotecards = ( value: string ) => {
    setFilterString(value)
    setActiveNotecards(
      notecards.filter((notecard)=> notecard.name.toLowerCase().includes(value.toLowerCase()))
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView style={[styles.homePageNotecardSection, {
        paddingVertical: 8,
        backgroundColor: theme.colors.secondaryBackground }]}>
        <Welcome />
        <SearchBar
          value={filterString}
          onChangeText={(value) => filterNotecards(value)}
          placeholder={t('filterByTitle')}
          containerStyle={{
            backgroundColor:theme.colors.primaryBackground,
            borderColor:theme.colors.primaryBackground,
            elevation: 10}}
        />
        {activeNotecards.map((notecard, i) => (
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
            onPress={() => loadDetailsPage(notecard)}
          >
            <ListItem.Content>
              <ListItem.Title
                style={{ color: theme.colors.primaryText, fontWeight: 'bold' }}
              >
                {notecard.name}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron color={theme.colors.primaryText} />
          </ListItem>
        ))}
      </ScrollView>
    </View>
  )
}

export default Home;