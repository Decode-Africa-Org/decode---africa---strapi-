const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::article.article', {
  config: {
    find: { auth: false },
    findOne: { auth: false },
    create: { auth: { scope: ['api::article.article.create'] } },
    update: { auth: { scope: ['api::article.article.update'] } },
    delete: { auth: { scope: ['api::article.article.delete'] } },
  },
});