# Introduction ✨

  BEFinances is a project that help you control your expenses. This project have three modules: 

  #### Users Module
  - Responsible for Authentication, this module basically turns the database multi-tenant, where each user has our transactions/budgets.
  #### Transacations Module
  - This module has the responsibility of creating and calculating user expenses.
  #### Budgets Module
  - This module provides an expenses rate limit in a specific date.

## Project Architecture 📝
 In this project I used some SOLID Principles, such as:
 - Single Responsibility Principle
 - The Open-Closed Principle
 - The Dependency Inversion Principle

## Technologies 🔥
  I used these technologies to make this project:
  - Node.js (Javascript) 
  - Typescript
  - Mysql
  - Prisma.io
  - JWT (jsonwebtoken)
  - Serverless
  - Joi
  - Jest
  - Docker
  - Eslint
  - env

## Architeture
## BEFinances Api Draw
<details>
  <summary> Click here to see the API logic draw</summary>

  ![BEFinancesApiDraw](https://imgur.com/mWNY70e.png) 
 
</details>

<p>
  This repository is the server-side (back-end). If you would like to see the client-side (front-end), <a href = "https://github.com/GuilhermeBarroso-sys/BEFinances-web"> click here! </a>
</p>

# 📋 Running the project (local) 🚀

  ### Requirements ⚙️
    - Docker / Docker-compose
    - Nodejs (v16.x)
    - Package managment (npm)

1. Run `npm i` command
2. Create a .env file or rename .env.example to .env, and put these secrets:

```
DATABASE_URL= 'mysql://docker:docker@localhost:3306/api'
JWT_SECRET= 'some secret key to JWT'
```
3. Run MySQL container in docker, you can use the docker-compose command:

```
 docker-compose up
 
 # Note: if you change the docker credentials on docker-compose.yml, you'll need to change the "DATABASE_URL" in env either.
 # Probably this command will block your terminal input, so after running this command, split or open another terminal to continue the steps, if necessary.
 
```
4. Run prisma command to sync the database

```
  npx prisma db push
```

5. Run the local server

```
  npm run dev
```


# 📚 Folders

```
├── src - Main folder
│   ├── @types - Some custom types for the app
│   ├── errors - Handle errors for the Api response
│   ├── lib - Functions that help in the development
│   ├── middleware - all project middlewares such as authentication.
│   ├── mocks - mocks that help in the unit tests
│   ├── modules
│       ├── budgets
│           ├── repositories - DB operations and interfaces
│           ├── useCases -  Controller, Factory, schema, tests
│       ├── transactions
│           ├── repositories - DB operations and interfaces
│           ├── useCases -  Controller, Factory, schema, tests
│       ├── users
│           ├── repositories - DB operations and interfaces
│           ├── useCases -  Controller, Factory, schema, tests
│   ├── prisma - prisma connection.
│   ├── routes - all endpoints handler of the project

```
