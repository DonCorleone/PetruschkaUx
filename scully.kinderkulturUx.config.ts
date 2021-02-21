import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import { HomeComponent } from 'src/app/home/home.component';
const {MinifyHtml} = require('scully-plugin-minify-html');
const {DisableAngular} = require('scully-plugin-disable-angular');
setPluginConfig(DisableAngular, {
  removeState: true
});
const postRenderers = [DisableAngular, MinifyHtml];

const {
  RouteTypes,
} = require('@scullyio/scully');

export const config: ScullyConfig = {
  projectRoot: "./src",
  defaultPostRenderers: postRenderers,
  projectName: "kinderkulturUx",
  outDir: './dist/static',
  routes: {
    '': {
      type: RouteTypes.json,
      url: 'http://localhost:4200/home'
    }
  }
};
