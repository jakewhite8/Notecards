type NotecardData = {
  name: string;
  cardId: number;
  linearGradientColors: [string, string];
};

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

type NewUser = {
  name: string;
  username: string;
  email: string;
  password: string;
}

export type { StackParamList, NotecardData, NewUser };