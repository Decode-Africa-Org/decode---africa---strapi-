const path = require('path');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres');
  
  // postgres database connection
  const connections = {
    postgres: {
      connection: {
        connectionString: env('DATABASE_URL'),
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'decodeafrica'),
        user: env('DATABASE_USERNAME', 'decodeafrica'),
        password: env('DATABASE_PASSWORD', 'decodeafrica'),
        ssl: env.bool('DATABASE_SSL', false) && {
          key: env('DATABASE_SSL_KEY', undefined),
          cert: env('DATABASE_SSL_CERT', undefined),
          ca: env('DATABASE_SSL_CA', undefined),
          capath: env('DATABASE_SSL_CAPATH', undefined),
          cipher: env('DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
        schema: env('DATABASE_SCHEMA', 'public'),
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    }
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};

// 


// const config = {
//   DATABASE_URL: process.env.DATABASE_URL,
//   DB_HOST: process.env.DB_HOST || 'localhost',
//   DB_PORT: process.env.DB_PORT || 5432,
//   DB_USER: process.env.DB_USER || 'decodeafrica',
//   DB_NAME: process.env.DB_NAME || 'decodeafrica',
//   DB_PASSWORD: process.env.DB_PASSWORD,
//   DB_SSL: process.env.DB_SSL === 'true'
// };

// const knex = require('knex')({
//   client: 'pg',
//   connection: {
//     connectionString: config.DATABASE_URL,
//     host: config.DB_HOST,
//     port: Number(config.DB_PORT),
//     user: config.DB_USER,
//     database: config.DB_NAME,
//     password: config.DB_PASSWORD,
//     ssl: config.DB_SSL ? { rejectUnauthorized: false } : false,
//   },
// });

// module.exports = knex;
