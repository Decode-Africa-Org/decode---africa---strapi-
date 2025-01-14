const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::article.article', {
  config: {
    find: { auth: false },
    findOne: { auth: false },
    create: { 
      auth: { scope: ['api::article.article.create']},
      policies: ['is-author']
    },
    update: { 
      auth: { scope: ['api::article.article.update']}, 
      policies: ['is-author-or-is-editor']
    },
    delete: { 
      auth: { scope: ['api::article.article.delete']},
      policies: ['is-author-or-is-editor-or-admin']
    },
  },
});