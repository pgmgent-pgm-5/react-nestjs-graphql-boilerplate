import { User } from "src/users/models/user.model";
import { define } from "typeorm-seeding";
import * as Faker from 'faker';

define(User, (faker: typeof Faker) => { 
  const user = new User();
  user.username = faker.internet.userName();
  user.email = faker.internet.email();
  user.password = faker.random.word();
  return user;
});