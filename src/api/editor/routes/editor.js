'use strict';

/**
 * category router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::editor.editor', {
    config: {
      find: { auth: false },
      findOne: { auth: false },
      create: { auth: { scope: ['api::editor.editor.create'] } },
      update: { auth: { scope: ['api::editor.editor.update'] } },
      delete: { auth: { scope: ['api::editor.editor.delete'] } },
    },
});
