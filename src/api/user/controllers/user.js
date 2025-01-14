'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
const bcrypt = require('bcrypt');

module.exports = createCoreController('api::user.user', ({ strapi }) => ({
    //find all users
    async findMany(ctx) {
        const {user} = ctx.state;
        if(!user || user.role.name !== 'admin') {
            return ctx.return('Please log in to perform this search');
        }

        try {
            const {filters={}, sort='createdAt:desc'} = ctx.query;
            const page = parseInt(ctx.query.page?.toString() || '1', 1);
            const pageSize = parseInt(ctx.query.pageSize?.toString() || '10', 10);

            const entity = await strapi.db.query('api::user.user')
            .findMany({
                where: filters,
                orderBy: sort,
                offset: (page - 1) * pageSize,
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
            populate: {comment: true, interactions: true}
        });
        
        //return 404 if no user
        if (!entity){
            return ctx.notFound('User not found');
        }

        return {data: entity};
    },

    // Create article
    async create(ctx) {
        const { user } = ctx.state;
        
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.body?.data?.password, salt);
            const data = {
                ...ctx.request.body?.data,
                id: user.id,
                password: hashedPassword,
                avartar: user?.avartar,
                status: user.status,
            };

        
            const entity = await strapi.db.query('api::user.user').create({
                data,    
            })

            return {data: {...entity, password: undefined}};
        } catch (error) {
            return ctx.throw(400, 'User account creation failed', {error});
        }
    },

    // Update article
    async update(ctx) {
        const { id } = ctx.params;
        const {user} = ctx.state;
        try {
            const existingUser = await strapi.db.query('api::user.user').findOne({where: {id}});
            
            if (!existingUser)  {
                return ctx.notFound('User not found');
            }
            
            if (existingUser.user !== user.id || user.role.name !== 'admin')    {
                return ctx.unauthorized('Not allowed to make changes');
            }
            
            const data  = {...ctx.request.body?.data};

            if(data.password) {
                const salt = await bcrypt.genSalt(10);    
                data.password = await bcrypt.hash(data.password, salt);
            }

            //update info if user exist
            const entity = await strapi.db.query('api::user.user').update({
                where: {id},
                data
            });

            return {data: {...entity, password: undefined}};
        } catch (error) {
            return ctx.throw(400, 'User update failed', {error});
        }
    },

    // Delete user
    async delete(ctx) {
        const { id } = ctx.params;
        const {user} = ctx.state;
        try {
            const exitingUser = await strapi.db.query('api::user.user').findOne({where: {id}});

            if(!exitingUser) {
                return ctx.notFound('User not user');
            }

            if(exitingUser.user !== user.id) {
                return ctx.unauthorized('Not authorized to delete the account');
            }
            await strapi.db.query('api::user.user').delete({
                where: {id}
            });
            return {message: "Account deletion completed successfully"};
        } catch (error) {
            ctx.throw(400, 'Account deletion failed', {error});
        }
    }
}));
