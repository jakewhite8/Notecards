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
  Details: {
    name: string;
    card: NotecardData;
  };
  Home: undefined;
  Notecard: {
    cardId: number
  };
  ReviewSet: undefined;
}

export type { StackParamList, NotecardData };