'use strict';

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::tags.tags', ({strapi}) => ({

    // Get a tag
    async findMany(ctx) {
        try {
           const entity = await strapi.db.query('api::tags.tags').findMany({populate: {article: true}});

           //return 404 if tag not found
           if(!entity)  {
                return ctx.notFound('Tag not found');
           }

           return {data: entity};
        } catch (error) {
            ctx.throw(400, 'Error finding the tag', {error});
        }
    },

    // Add a tag
    async create(ctx) {
        const user = ctx.state;

        try {
            const data = { ...ctx.request.body?.data };

            if(!user)   {
                return ctx.unauthorized('Not authorize to create a tag');
            }

            const entity = await strapi.db.query('api::tags.tags').create({data});

            return {data: entity};
        } catch (error) {
            return ctx.throw(400, 'Error creating the tag', {error});
        }
    },

    // Update a tag
    async update(ctx)   {
        const user = ctx.state;
        const {id} = ctx.params;

        try {
            const data = { ...ctx.request.body?.data };

            const existingTag = await strapi.db.query('api::tags.tags').findOne({where: {id}});

            //when tag not found
            if (!existingTag)   {
                return ctx.notFound('Tag not found');
            }

            //unauthorize user
            if(existingTag.user !== user.id)    {
                return ctx.unauthorized('Not authorize to change the tag');
            }

            const entity = await strapi.db.query('api::tags.tags').update({
                where: {id},
                data
            });

            return {data: entity};
        } catch (error) {
            return ctx.throw(400, 'Error updating the tag');
        }
    },
    //delete a tag
    async delete(ctx) {
        const {id} = ctx.params;
        const user = ctx.state;

        try {
            const existingTag = await strapi.db.query('api::tags.tags').findOne({where: {id}});

            //when tag not found
            if (!existingTag)   {
                return ctx.notFound('Tag not found');
            }

            //unauthorize user
            if(existingTag.user !== user.id)    {
                return ctx.unauthorized('Not authorize to change the tag');
            }

            await strapi.db.query('api::tags.tags').delete({where: {id}});

            return {mesage: 'Tag deleted successfully'};
        } catch (error) {
            return ctx.throw(400, 'Error deleting the tag', {error});
        }
    }
}));