export interface UserDetails_user {
    __typename: "User";
    id: string;
    name: string; 
    patronymic: string;
    surname: string;
  }

  export interface UserDetails {
    me: UserDetails_user;
  }