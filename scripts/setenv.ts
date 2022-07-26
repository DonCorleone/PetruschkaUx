const { writeFile } = require('fs');
const { argv } = require('yargs'); // read environment variables from .env file
require('dotenv').config(); // read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';
const targetPath = `./src/environments/environment.custom.ts`; // we have access to our environment variables
// in the process.env object thanks to dotenv

const environmentFileContent = isProduction
	? `export const environment = {
   production: true,
   APP_ID_REALM: "${process.env.APP_ID_REALM}",
   NODE_VERSION: "${process.env.NODE_VERSION}",
   SITE_ID: "${process.env?.['SITE_ID']}",
   API_KEY_NETLIFY: "${process.env?.['API_KEY_NETLIFY']}",
   URL: "${process.env?.['URL']}",
};`
	: `export const environment = {
   production: false,
   APP_ID_REALM: "${process.env.APP_ID_REALM}",
   NODE_VERSION: "${process.env.NODE_VERSION}",
   SITE_ID: "${process.env?.['SITE_ID']}",
   API_KEY_NETLIFY: "${process.env?.['API_KEY_NETLIFY']}",
   URL: "${process.env?.['URL']}",
};`; // write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err: any) {
	if (err) {
		console.log(err);
	}
	console.log(`Wrote variables to ${targetPath}`);
});
