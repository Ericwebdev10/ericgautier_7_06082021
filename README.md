
# Frontend
1- Clone the repository.
2- Prerequisite :
- npm install -g @vue/cli
- vue add router
- vue add vuex  
- npm install --save axios vue-axios
- npm install --save vuelidate
- npm install --save vue-jwt-decode

Then compile with : 
- npm run serve

Open your browser : http://localhost:8080/


# backend
1- Clone the repository.
2- Prerequisite :
- Npm init => entry point: (index.js) server.js
- npm install --save express
- npm install --save body-parser
- npm install --save multer
- npm install --save bcrypt
- npm install --save jsonwebtoken
- npm install password-validator
- npm install --save express-rate-limit
- npm install helmet --save
- npm i maskdata
- npm i sequelize
- npm i mysql2
- npm install crypto-js


3- Create .env file at the root, add the following keys and their secret values :
- DB_USER=
- DB_PASS=
- DB_TOKEN=
- DB_HOST= only if different from @localhost

Then start the server with : 
- nodemon server


# mySQL
- Import groupomania.sql