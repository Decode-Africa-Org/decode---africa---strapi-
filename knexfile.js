// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'decodeafrica',
      user:     'decodeafrica',
      password: 'decodeafrica'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'decodeafrica',
      user:     'decodeafrica',
      password: 'decodeafrica'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'decodeafrica',
      user:     'decodeafrica',
      password: 'decodeafrica'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
