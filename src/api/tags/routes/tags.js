const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::tags.tags', {
  config: {
    find: { auth: false },
    findOne: { auth: false },
    create: { 
      auth: { scope: ['api::tags.tags.create']},
    },
    update: { 
      auth: { scope: ['api::tags.tags.update']}, 
    },
    delete: { 
      auth: { scope: ['api::tags.tags.delete']},
    },
  },
});