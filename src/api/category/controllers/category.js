'use strict';

/**
 *  category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::category.category', ({ strapi }) => ({

    // Find all categories
    async findMany(ctx) {
        try {
            const {filters={}, sort='createdAt:desc'} = ctx.query;
            const page = parseInt(ctx.query?.page.toString() || '1', 1);
            const pageSize = parseInt(ctx.query?.pageSize.toString() || '10', 10);
            const entity = await strapi.db.query('api::category.category').findMany({
                where: filters,
                offset: (page - 1) * pageSize,
                limit: pageSize
            });
            const total = await strapi.db.query('api::category.category').count({where: filters});

            return {
                data: entity,
                meta: {page, pageSize, total}
            }
        } catch (error) {
            return ctx.throw(400, 'Error finding categories')
        }
    },

    // Find one category
    async findOne(ctx) {
        const { id } = ctx.params;
       
        try {
            const entity = await strapi.db.query('api::category.category').findOne({where: {id}});
            
            if (!entity)    {
                return ctx.notFound('Category not found');
            }

            return entity;
        } catch (error) {
          return ctx.throw(400, 'Error finding the category', {error});  
        }
    },

    // Create category
    async create(ctx) {
        const {user} = ctx.state;
        try {
            const data = { ...ctx.request.body?.data };

            //Allow only admin to create category
            if (user.role.name !== 'admin') {
                return ctx.forbidden('Not allowed to create category');
            }

            const entity = await strapi.db.query('api::category.category').create({data});

            return {data: entity}
        } catch (error) {
            return ctx.throw(400, 'Error creating the category', {error});
        }
    },

    // Update category
    async update(ctx) {
        const {id} = ctx.params;
        const {user} = ctx.state;

        try {
            const data = { ...ctx.request.body?.data };
            const existingCat = await strapi.db.query('api::category.category').findOne({where: {id}});

            //return 404 if not found
            if (!existingCat)   {
                return ctx.notFound('Category not found');
            }

            //only admin can make changes
            if (user.role.name !== 'admin') {
                return ctx.forbidden('Not allow to make changes to category');
            }

            const entity = await strapi.db.query('api::category.category').update({
                where: {id},
                data
            });

            return {data: entity};
        } catch (error) {
                return ctx.throw(400, 'Error updating the category', {error});
        }
    },

    // Delete category
    async delete(ctx) {
        const {id} = ctx.params;
        const {user} = ctx.state;

        try {
            const existingCat = await strapi.db.query('api::category.category').findOne({where: {id}});

            //return 404 if not found
            if (!existingCat)   {
                return ctx.notFound('Category not found');
            }

            //only admin can delete the category
            if (user.role.name !== 'admin') {
                return ctx.forbidden('Not allow to delete the category');
            }

            await strapi.db.query('api::category.category').delete({ where: {id}});

            return {message: 'Category deleted successfully'};
        } catch (error) {
                return ctx.throw(400, 'Error deleting the category', {error});
        }
    }
}));
