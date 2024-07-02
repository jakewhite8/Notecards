interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  token: string;
}

interface NotecardSet {
  title: string;
  id: number | null;
  notecards: Array<[string, string]>;
}

export type { NotecardSet, User };