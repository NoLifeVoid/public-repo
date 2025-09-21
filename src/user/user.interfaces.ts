import { entity } from '../interfaces';
import { Country, Company, Right, Group, Set, Manufacturer } from './../../node_modules/.prisma/client/index.d';
// Input type for creating a user
export interface newUser extends entity{
  username: string;
  email: string;
  passwordHash?: string; //TODO: remove this not required no more

  countries: string[];  // array
  companies: string[];  // array
  groups?: string[]; // optional array of group IDs
  rights?: string[]; // optional array of right IDs
  sets?: string[];   // optional array of set IDs
  manufacturers?: string[]; // optional array of manufacturer IDs
  refreshToken?:string
}

// Example of output interface
export interface User {
  id: string;
  username: string;
  emailHash: string;
  passwordHash: string|undefined|null;
  

  countries: Country[];
  companies: Company[];
  groups: Group[];
  rights: Right[];
  sets: Set[];
  manufacturers: Manufacturer[];
}

export interface minalUser{
  id: string;
    username: string;
    emailHash: string;
}
