type NotecardData = {
  title: string;
  ID: number;
  linearGradientColors: [string, string];
};

type NewNotecardSet = {
  title: string;
  notecards: Array<[string, string]>;
}

// Define a route and their params types
type StackParamList = {
  Activity: undefined;
  CreateTitle: undefined;
  CreateCard: {
    cardTitle: string;
  }
  CustomDrawer: undefined;
  Details: {
    name: string;
    card: NotecardData;
  };
  DrawerNavigator: undefined;
  Home: undefined;
  Loading: undefined;
  Login: undefined;
  Notecard: {
    name: string;
    cardId: number;
  };
  Register: undefined;
  ReviewSet: undefined;
  Settings: undefined;
}

type LoginCredentials = {
  email: string;
  password: string;
}

type NewUser = {
  name: string;
  username: string;
  email: string;
  password: string;
}

export type { LoginCredentials, NewNotecardSet, NewUser, NotecardData, StackParamList };