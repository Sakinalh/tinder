// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Genders = {
  "MALE": "MALE",
  "FEMALE": "FEMALE"
};

const { Matches, User } = initSchema(schema);

export {
  Matches,
  User,
  Genders
};