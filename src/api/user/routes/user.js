'use strict';

/**
 * Users router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::user.user', {
    config: {
      find: { auth: false },
      findOne: { auth: false },
      create: { auth: { scope: ['api::user.user.create']}},
      update: { 
        auth: { scope: ['api::user.user.update']},  
        policies: ['is-owner']
      }, // Only the user who owns the profile can update },
      delete: { 
        auth: { scope: ['api::user.user.delete']},
        policies: ['is-owner-or-admin']
      },
    },
});
