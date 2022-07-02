const { writeFile } = require('fs');

// Your environment.custom.ts file. Will be ignored by git.
const targetPath = './src/environments/environment.custom.ts';

// Load dotenv to work with process.env
require('dotenv').config();

// environment.ts file structure

const envConfigFile = `
function getApiBasePath(): string {
	return (window as any).config.API_BASE_PATH  || 'default-url';
}
export const environment = {
   production: false,
   APP_ID_REALM: "${process.env.APP_ID_REALM}",
   NODE_VERSION: "${process.env.NODE_VERSION}",
   SITE_ID: "${process.env?.['SITE_ID']}",
   API_KEY_NETLIFY: "${process.env?.['API_KEY_NETLIFY']}",
   URL: "${process.env?.['URL']}",
};
`; // write the content to the respective file
writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log('Using custom environment');
  }
});
