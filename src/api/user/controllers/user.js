'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::user.user', ({ strapi }) => ({
    //find all users
    async findMany(ctx) {
        try {
            const {filters={}, sort='createdAt:desc'} = ctx.query;
            const page = parseInt(ctx.query.page?.toString() || '1', 1);
            const pageSize = parseInt(ctx.query.pageSize?.toString() || '10', 10);

            const entity = strapi.db.query('api::user.user')
            .findMany({
                where: filters,
                orderBy: sort,
                offset: page,
                pageSize: (page - 1) * pageSize,
                limit: pageSize,
                populate: {comment: true, interactions: true}
            });

            const total = strapi.db.query('api::user.user').count({where: {filters}});

            return {
                data: entity,
                meta: {page, pageSize, total}
            };
        } catch (error) {
            ctx.throw(400, "No users found", {error});
        }
    },

    // Find one user
    async findOne(ctx) {
        const { id } = ctx.params;
        const entity = await strapi.db.query('api::user.user').findOne({
            where: { id },
            populate: {user: true}
        });
        
        //return 404 if no user
        if
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
