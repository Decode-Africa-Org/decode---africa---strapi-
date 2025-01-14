'use strict';

/**
 * category router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::category.category', {
    config: {
      find: { auth: false },
      findOne: { auth: false },
      create: { auth: { scope: ['api::category.category.create'] } },
      update: { auth: { scope: ['api::category.category.update'] } },
      delete: { auth: { scope: ['api::category.category.delete'] } },
    },
});
