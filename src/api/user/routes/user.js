'use strict';

/**
 * category router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::user.user', {
    config: {
      find: { auth: false },
      findOne: { auth: false },
      create: { auth: { scope: ['api::user.user.create'] } },
      update: { auth: { scope: ['api::user.user.update'] } },
      delete: { auth: { scope: ['api::user.user.delete'] } },
    },
});
