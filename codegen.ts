import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://beta.pokeapi.co/graphql/v1beta',
  documents: ['src/domains/**/*.gql.ts'],
  generates: {
    'src/__generated__/graphql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
