'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::comments.comments', ({strapi}) => ({

    // Find all comments
    async findMany(ctx) {
        try {
            const { filters = {}, sort='createdAt:desc'} = ctx.query;
            const page = parseInt(ctx.query.page?.toString() || '1', 1);
            const pageSize = parseInt(ctx.query.pageSize?.toString() || '10', 10);
            
            const entity = strapi.db.query('api::comments.comment').findMany({
                where: filters,
                orderBy: sort,
                offset: (page - 1) * pageSize,
                limit: pageSize,
                populate: {user: true}
            });

            const total = await strapi.db.query('api::comments.comments').count({where:filters});

            return {
                data: entity,
                meta: {
                    page, pageSize, total
                }
            };
        } catch (error) {
            ctx.throw(400, "Unable to fetch comments", {error});
        }
    },

    // Find one comment
    async findOne(ctx) {
        const { id } = ctx.params;
        try {
            const entity = await strapi.db.query('api::comments.comments').findOne({ 
                where: { id },
                populate: {user: true}
            });

            if (!entity) {
                return ctx.notFound('Comment not found');
            }

            return {data: entity};
        } catch (error) {
            return ctx.throw(400, 'An error occurred', {error});
        }
    },

    // Create comment
    async create(ctx) {
        const {user} = ctx.state;
        try {
            const data = {
                ...ctx.request.body.data,
                user: user.id
            };

            const entity = await strapi.db.query('api::comments.comments').create({data});
            return {data: entity};
        } catch (error) {
            ctx.throw(400, "Error creating comment", {error})
        }
    },

    // Update comment
    async update(ctx) {
        const {id} = ctx.params;
        const {user} = ctx.state;
        try {
            //get the existing comment
            const exitingComment = await strapi.db.query('api::comments.comments').findOne({where: {id}});

            //throw 404 if not found
            if(!exitingComment) {
                return ctx.notFound("Comment not found");
            }

            //reject unauthorized users of editing others user comments
            if (exitingComment.user !== user.id) {
                return ctx.unauthorized('You are not allowed to edit the comment');
            }

            const data = {...ctx.request.body.data};
            const entity =  await strapi.db.query('api::comments.comments').update({
                where: {id},
                data
            })
            return {data: entity};
        } catch (error) {
            ctx.throw(400, 'Error updating comment', {error})
        }
    },

    // Delete comment
    async delete(ctx) {
        const {id} = ctx.params;
        const {user} = ctx.state;

        try {
            const exitingComment = await strapi.db.query('api::comments.comments').findOne({where: {id}});
            
            // throw 404 if comment not found
            if (!exitingComment)    {
                return ctx.notFound("Comment not found");
            }

            //reject unauthorized users to delete other comment
            if(exitingComment.user !== user.id) {
                return ctx.unauthorized("You are unautorized to delete this comment");
            }

            await strapi.db.query('api::comments.comments').delete({where: {id}});

            return {message: 'Comment deleted successfully'};
        } catch (error) {
            ctx.throw(400, "Error deleting comment", {error});
        }
    }
}));

/**
 * const data = {
                ...ctx.request.body.data,
                user: user.id
            };
            const entity = await strapi.db.query('api::comment.comment').update({id, data});
 */