'use strict';

/**
 *  article controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article.article', ({ strapi }) => ({
    //Find all article
    async find(ctx) {
        const entity = await strapi.db.query('api::article.article').findMany();
        return entity;
    },

    // Find one article
    async findOne(ctx) {
        const { id } = ctx.params;
        const entity = await strapi.db.query('api::article.article').findOne({
            where: { id },
            populate: ['author']
        });
        return entity;
    },

    // Create article
    async create(ctx) {
        const { user } = ctx.state;
        const data = {
            ...ctx.request.body.data,
            user: user.id
        };
        
        const entity = await strapi.db.query('api::article.article').create({
            data
        });
        return entity;
    },

    // Update article
    async update(ctx) {
        const { id } = ctx.params;
        const entity = await strapi.db.query('api::article.article').update({
            where: { id },
            data: ctx.request.body.data
        });
        return entity;
    },

    // Delete article
    async delete(ctx) {
        const { id } = ctx.params;
        const entity = await strapi.db.query('api::article.article').delete({
            where: { id }
        });
        return entity;
    }
}));
