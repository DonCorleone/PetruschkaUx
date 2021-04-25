const fs = require('fs')
fs.writeFileSync('./.env', `API_KEY_IMAGE4IO=${process.env.API_KEY_IMAGE4IO}\nAPI_SECRET_IMAGE4IO=${process.env.API_SECRET_IMAGE4IO}\nAPI_URL_IMAGE4IO=${process.env.API_URL_IMAGE4IO}\n`)
