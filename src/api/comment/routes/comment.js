const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::comments.comments', {
  config: {
    find: { auth: false },
    findOne: { auth: false },
    create: { auth: { scope: ['api::comments.comments.create'] } },
    update: { auth: { scope: ['api::comments.comments.update'] } },
    delete: { auth: { scope: ['api::comments.comments.delete'] } },
  },
});