type NotecardData = {
  name: string;
  cardId: number;
  linearGradientColors: [string, string];
};

// Define a route and their params types
type StackParamList = {
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
  Login: undefined;
  Notecard: {
    name: string;
    cardId: number;
  };
  Register: undefined;
  ReviewSet: undefined;
  Settings: undefined;
}

export type { StackParamList, NotecardData };