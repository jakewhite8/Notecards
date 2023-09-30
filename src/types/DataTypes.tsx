type NotecardData = {
  name: string;
  cardId: number;
  linearGradientColors: string[];
};

// Define a route and their params types
type StackParamList = {
  Create: undefined;
  Details: {
    name: string;
    card: NotecardData
  };
  Home: undefined;
}

export type { StackParamList, NotecardData };