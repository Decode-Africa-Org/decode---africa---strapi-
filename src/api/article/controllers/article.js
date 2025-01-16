'use strict';
/**
 *  article controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article.article', ({ strapi }) => ({
    //Find all article
    async findMany(ctx) {
        try {
            const {filters={},sort='createdAt:desc'} = ctx.query;
            const page = parseInt(ctx.query?.page.toString() || '1', 1);
            const pageSize = parseInt(ctx.query?.pageSize.toString() || '10', 10);
            
            const entity = await strapi.db.query('api::article.article').findMany({
                where: filters,
                orderBy: sort,
                offset: (page - 1) * pageSize,
                limit: pageSize
            });

            const total = await strapi.db.query('api::article.article').count({where: filters})

            return {
                data: entity,
                meta: {page, pageSize, total}
            }
        } catch (error) {
            return ctx.throw(400, 'No comments found', {error})
        }
    },

    //Get one article
    async findOne(ctx)  {
        const {id} = ctx.params;

        try {
            const entity = await strapi.db.query('api::aritcle.article').findOne({where: {id}});

            if(!entity) {
                return ctx.notFound('Discovery not found');
            }

            return {data: entity};
        } catch (error) {
            return ctx.throw(400, 'Error getting this dicovery', {error});
        }
    },

    // Create article
    async create(ctx, next) {  
        const { user } = ctx.state;

        try {
            const data = { 
                ...ctx.request.body?.data,
                user: user.id,
                status: 'draft',
            };

            if(user.role.name !== 'author')   {
                return ctx.forbidden('Not authorized to create an article');
            }

            const entity = await strapi.db.query('api::article.article').create({data});
            return entity;
        } catch (error) {
            ctx.throw(400, 'Article creation failed')
        }
    },

    // Update article
    async update(ctx, next) {
        const { id } = ctx.params;
        const {user} = ctx.state;
        try {
            const data = { ...ctx.request.body?.data};

            //Get the article that the changes will be made
            const existingArticle = await strapi.db.query('api::article.article').findOne({where: {id}});
            
            //Return 404 when article does not exist
            if (!existingArticle)   {
                return ctx.notFound('Article not found');
            }

            // Editors and author can only make changes to article
            if(existingArticle.user !== user.id && user.role.name !== 'editor')  {
                return ctx.forbidden('Not allow to make changes to the article');
            }

            const entity = await strapi.db.query('api::article.article').update({
                where: {id},
                data
            });

            return entity;
        } catch (error) {
            ctx.throw(400, 'Error updating the article', {error});
        }
    },

    // Delete article
    async delete(ctx) {
        const { id } = ctx.params;
        const {user} = ctx.state;
       try {
            //Get the article that would be deleted
            const existingArticle = await strapi.db.query('api::article.article').findOne({where: {id}});
            
            //Return 404 when article does not exist
            if (!existingArticle)   {
                return ctx.notFound('Article not found');
            }

            // Editors, admin and author can delete article
            if(existingArticle.user !== user.id && user.role.name !== 'editor' && user.role.name !== 'admin')  {
                return ctx.forbidden('Not allow delete the article');
            }


            await strapi.db.query('api::article.article').delete({where: {id}});

            return {message: 'Article deleted successfully'};
       } catch (error) {
            return ctx.throw(400, 'Error deleting the article', {error});
       }
    }
}));
