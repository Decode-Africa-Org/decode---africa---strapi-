'use strict';

/**
 *  category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::category.category', ({ strapi }) => ({

    // Find all categories
    async find(ctx) {
        const entity = await strapi.db.query('api::category.category').findMany();
        return entity;
    },

    // Find one category
    async findOne(ctx) {
        const { id } = ctx.params;
        const entity = await strapi.db.query('api::category.category').findOne({
            where: { id },
            //populate: ['author']
        });
        return entity;
    },

    // Create category
    async create(ctx) {
        const { user } = ctx.state;
        const data = {
            ...ctx.request.body.data,
        };
        
        const entity = await strapi.db.query('api::category.category').create({
            data
        });
        return entity;
    },

    // Update category
    async update(ctx) {
        const { id } = ctx.params;
        const entity = await strapi.db.query('api::category.category').update({
            where: { id },
            data: ctx.request.body.data
        });
        return entity;
    },

    // Delete category
    async delete(ctx) {
        const { id } = ctx.params;
        const entity = await strapi.db.query('api::category.category').delete({
            where: { id }
        });
        return entity;
    }
}));
