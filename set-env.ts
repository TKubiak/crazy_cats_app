const { writeFile, existsSync, mkdirSync } = require('fs');
const path = require('path');

const dotEnvFile = path.join(__dirname, '/.env');
// Configure Angular `environment.ts` file path

// Check that .env file exists
if (!existsSync(dotEnvFile)) {
  throw console.error('ERROR! .env file not found. Try to create it basing on .env.example file.');
}

// Load node modules
require('dotenv').config();

const targetFile = path.join(__dirname, `/src/environments/environment.ts`);
const targetPath = path.join(__dirname, `/src/environments`);

// `environment.ts` file structure
const envConfigFile = `
/**
 * DO NOT MODIFY THIS FILE!
 * 
 * This file is generated dynamically by set-env.ts script.
 * The content of this file is defined by CI/CD env variables during CI/CD process or by .env file locally
 * If you want to modify some of the values you need to change them in .env file or Gitlab CI/CD variables
 * 
 * REMEMBER! You have to restart dev server (npm run start) after every .env change
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const environment: any = {
  production: ${process.env.PRODUCTION || true},
  catsApiUrl: '${process.env.CATS_API_URL}',
};
`;

console.log(`The file environment.ts will be written with the following content: \n`);
console.log(envConfigFile);

try {
  if (!existsSync(targetPath)) {
    mkdirSync(targetPath);
  }

  writeFile(targetFile, envConfigFile, function (err: Error) {
    if (err) {
      throw console.error(err);
    } else {
      console.log(`Angular environment.ts file generated correctly at ${targetFile} \n\n`);
    }
  });
} catch (error) {
  console.error(error);
}
