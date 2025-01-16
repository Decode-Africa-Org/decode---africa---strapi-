'use strict';

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::interactions.interactions', ({strapi}) => ({
    //get all interactions
    async findMany(ctx) {
        try {
            const entity = await strapi.db.query('api::interactions.interactions').findMany();
            return {data: entity};
        } catch (error) {
            return ctx.throw(400, 'Error finding user reactions', {error});
        }
    },

    //add an interaction
    async create(ctx)   {
        const user = ctx.state;
        try {
            const data = { ...ctx.request.body?.data };
            const entity = await strapi.db.query('api::interactions.interactions').create({data});

            if(!user) {
                ctx.unauthorized('Not allow to react to this post');
            }
            return {data: entity};
        } catch (error) {
            return ctx.throw(400, 'Error adding a reaction', {error});
        }
    },

    //update a reaction
    async update(ctx)   {
        const {id} = ctx.params;
        const user = ctx.state;

        try {
            const existingReaction = await strapi.db.query('api::interactions.interactions').findOne({where: {id}});
            const data = { ...ctx.request.body?.data };

            if(!existingReaction)   {
                return ctx.notFound('Reaction not found');
            }

            if(existingReaction !== user.id)    {
                return ctx.unauthorized('Not allow to change the reaction');
            }
            const entity = await strapi.db.query('api::interactions.interactions').update({where: {id}, data});

            return {data: entity};
        } catch (error) {
            return ctx.throw(400, 'Error updating the reaction', {error});
        }
    },

    //delete a reaction
    async delete(ctx)   {
        const {id} = ctx.params;
        const user = ctx.state;

        try {
            const existingReaction = await strapi.db.query('api::interactions.interactions').findOne({where: {id}});

            if(!existingReaction)   {
                return ctx.notFound('Reaction not found');
            }

            if(existingReaction !== user.id)    {
                return ctx.unauthorized('Not allow to delete the reaction');
            }
            await strapi.db.query('api::interactions.interactions').delete({where: {id}});
            return {message: 'Reaction deleting successfully'};
        } catch (error) {
            return ctx.throw(400, 'Error deleting the reaction', {error});
        }
    }
}))