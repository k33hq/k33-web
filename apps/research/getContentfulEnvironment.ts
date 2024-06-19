import { strict as assert } from 'assert';
import { createClient } from 'contentful-management';
import { EnvironmentGetter } from 'contentful-typescript-codegen';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const {
  CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
  NEXT_PUBLIC_CONTENTFUL_RESEARCH_SPACE_ID,
  NEXT_PUBLIC_CONTENTFUL_RESEARCH_ENVIRONMENT,
} = process.env;

assert(CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN);
assert(NEXT_PUBLIC_CONTENTFUL_RESEARCH_SPACE_ID);
assert(NEXT_PUBLIC_CONTENTFUL_RESEARCH_ENVIRONMENT);

const getContentfulEnvironment: EnvironmentGetter = async () => {
  const contentfulClient = createClient({
    accessToken: CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
  });

  return contentfulClient
    .getSpace(NEXT_PUBLIC_CONTENTFUL_RESEARCH_SPACE_ID)
    .then((space) =>
      space.getEnvironment(NEXT_PUBLIC_CONTENTFUL_RESEARCH_ENVIRONMENT)
    );
};

module.exports = getContentfulEnvironment;
