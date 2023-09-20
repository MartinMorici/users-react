export interface User {
  name: {
    first: string;
    last: string;
  };
  location: {
    country: string;
  };
  picture: {
    thumbnail: string;
    medium: string;
  };
  id: {
    value: string;
  };
  login: {
    uuid: string;
  };
}

export enum Sort {
  NONE = 'none',
  NAME = 'name',
  LASTNAME = 'lastname',
  COUNTRY = 'country',
}
