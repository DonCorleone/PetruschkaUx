import { ScullyConfig } from '@scullyio/scully';

export const config: ScullyConfig = {
  projectRoot: './src',
  defaultPostRenderers: [],
  distFolder: './dist/kinderkulturUx', // output directory of your Angular build artifacts
  projectName: 'kinderkulturUx',
  outDir: './dist/static',
  routes: {},
  extraRoutes: ['/upcoming', '/tour', '/audio', '/history', '/team', '/contact'],
};
