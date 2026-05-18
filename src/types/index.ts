export interface Name {
  title: string;
  first: string;
  last: string;
}

export interface Location {
  street: {
    number: number;
    name: string;
  };
  city: string;
  state: string;
  country: string;
  postcode: string | number;
}

export interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface User {
  login: {
    uuid: string;
  };
  name: Name;
  email: string;
  phone: string;
  cell: string;
  location: Location;
  picture: Picture;
}

export interface RandomUserResponse {
  results: User[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

export type RootStackParamList = {
  Home: undefined;
  Details: { user: User };
};
