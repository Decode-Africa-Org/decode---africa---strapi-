'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::comment.comment', ({strapi}) => ({

    // Find all comments
    async findMany(ctx) {
        const entity = await strapi.db.query('api::comment.comment').findMany();
        return entity;
    },

    // Find one comment
    async findOne(ctx) {
        const {id} = ctx.params;
        const entity = await strapi.db.query('api::comment.comment').findOne({
            where: {id}
        });
        return entity;
    },

    // Create comment
    async create(ctx) {
        const {user} = ctx.state;
        const data = {
            ...ctx.request.body.data,
            user: user.id
        };
        const entity = await strapi.db.query('api::comment.comment').create({data});
        return entity;
    },

    // Update comment
    async update(ctx) {
        const {id} = ctx.params;
        const {user} = ctx.state;
        const data = {
            ...ctx.request.body.data,
            user: user.id
        };
        const entity = await strapi.db.query('api::comment.comment').update({id, data});
        return entity;
    },

    // Delete comment
    async delete(ctx) {
        const {id} = ctx.params;
        const entity = await strapi.db.query('api::comment.comment').delete({id});
        return entity;
    }
}));
