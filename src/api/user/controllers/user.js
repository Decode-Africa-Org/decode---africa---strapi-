'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::users.users', ({ strapi }) => ({
    // Find one user
    async findOne(ctx) {
        const { id } = ctx.params;
        const entity = await strapi.db.query('api::user.user').findOne({
            where: { id },
            populate: ['user']
        });
        return entity;
    },

    // Create article
    async create(ctx) {
        const { user } = ctx.state;
        const data = {
            ...ctx.request.body.data,
            user: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            status: user.status,

        };
        
        const entity = await strapi.db.query('api::user.user').create({
            data
        });
        return entity;
    },

    // Update article
    async update(ctx) {
        const { id } = ctx.params;
        const entity = await strapi.db.query('api::user.user').update({
            where: { id },
            data: ctx.request.body.data
        });
        return entity;
    },

    // Delete user
    async delete(ctx) {
        const { id } = ctx.params;
        const entity = await strapi.db.query('api::user.user').delete({
            where: { id }
        });
        return entity;
    }
}));
