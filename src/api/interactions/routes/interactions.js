const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::interacions.interactions', {
  config: {
    find: { auth: false },
    findOne: { auth: false },
    create: { 
      auth: { scope: ['api::interacions.interactions.create']},
      //policies: ['is-author']
    },
    update: { 
      auth: { scope: ['api::interacions.interactions.update']}, 
    //  policies: ['is-author-or-is-editor']
    },
    delete: { 
      auth: { scope: ['api::interacions.interactions.delete']},
    //  policies: ['is-author-or-is-editor-or-admin']
    },
  },
});