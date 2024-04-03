import { strict as assert } from 'assert';
import { createClient } from 'contentful-management';
import { EnvironmentGetter } from 'contentful-typescript-codegen';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const {
  CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
  NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
} = process.env;

assert(NEXT_PUBLIC_CONTENTFUL_SPACE_ID);
assert(NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT);
assert(CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN);

const getContentfulEnvironment: EnvironmentGetter = async () => {
  const contentfulClient = createClient({
    accessToken: CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
  });

  return contentfulClient
    .getSpace(NEXT_PUBLIC_CONTENTFUL_SPACE_ID)
    .then((space) => space.getEnvironment(NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT));
};

module.exports = getContentfulEnvironment;
