import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum Genders {
  MALE = "MALE",
  FEMALE = "FEMALE"
}



type MatchesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Matches {
  readonly id: string;
  readonly UserOne?: (User | null)[];
  readonly UsersTwo?: (User | null)[];
  readonly userIdOne?: string;
  readonly userIdTwo?: string;
  readonly isMatch?: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Matches, MatchesMetaData>);
  static copyOf(source: Matches, mutator: (draft: MutableModel<Matches, MatchesMetaData>) => MutableModel<Matches, MatchesMetaData> | void): Matches;
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly bio: string;
  readonly gender: Genders | keyof typeof Genders;
  readonly lookingFor: Genders | keyof typeof Genders;
  readonly sub: string;
  readonly matchesID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}