import dotenv from 'dotenv';
dotenv.config();

export enum Env {
  production = 'PROD',
  development = 'DEV',
}
export const initConfig = () => {
  switch (config.env) {
    case Env.production:
      console.log('Production environment');
      break;
    case Env.development:
      console.log('Development environment');
      break;
    default:
      throw new Error(`Unknown environment: ${config.env}`);
  }
};

export const config = {
  env: process.env.ENV,
  port: process.env.PORT,
  mongoDB: {
    host: process.env.MONGODB_HOST,
    port: process.env.MONGODB_PORT,
    dbName: process.env.MONGODB_DB_NAME,
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
    url: process.env.MONGODB_URL || 'mongodb://localhost:27017/noreddit',
  },
  mysql: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dbName: process.env.MYSQL_DB_NAME,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    url:
      process.env.MYSQL_URL ||
      'mysql://root:rootmaster@localhost:3306/cpnoreddit',
  },
  secrets: {
    jwt: process.env.JWT_SECRET || 'default-secret',
    jwtExp: 31557600,
  },
};
