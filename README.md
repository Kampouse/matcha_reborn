# 42school: matcha - a  "dating" web app

## Description

web app that allows you to match with people based on your interests and location bundled with [turborepo]( https://turbo.build/)

## Stack used  

    - [vite](https://vitejs.dev)  & [solidjs](https://solidjs.org) for the frontend  
    - [listhen](https://unjs.io/packages/listhen) &
     [h3](https://unjs.io/packages/h3) for the backend

## REQUIREMENTS

    - nodejs 18 or higher
    - npm or pnpm 
    - a .env   
    with the following variables:
    - DATABASE_HOST // the host of your database
    - DATABASE_USERNAME // the user of your database
    - DATABASE_PASSWORD // the password of your database

    my current setup is a  planetescale instance 

## INSTALLATION

    - npm install
    - npm run dev

## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

- `web at /app/web`: the frontend part of th app build on top of  [vite](https://vitejs.dev) with [solidjs](https://solidjs.org)
- `backend /app/backend`: the backend part of the app build on top of [h3](https://unjs.io/packages/h3) ran by on top of [listhen](https://unjs.io/packages/listhen)

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [vitest](https://vitest.dev) for testing
- [Prettier](https://prettier.io) for code formatting
