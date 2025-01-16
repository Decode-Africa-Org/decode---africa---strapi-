'use strict';

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::editor.editor', ({strapi}) => ({
    // find all editors
    async findMany(ctx) {
        try {
            const {filters={}, sort="createdAt:desc"} = ctx.query;
            const page = parseInt(ctx.query.page?.toString() || '1', 1);
            const pageSize = parseInt(ctx.query.pageSize?.toString() || '10', 10);

            const entity = await strapi.db.query('api::editor.editor').findMany({
                where: filters,
                orderBy: sort,
                offset: (page - 1) * pageSize,
                limit: pageSize,
                populate: {article: true, user: true},
            });

            const total = await strapi.db.query('api::editor.editor').count({where: filters});

            return {
                data: entity,
                meta: {page, pageSize, total}
            };
        } catch (error) {
            ctx.throw(400, "Error fetching editors", {error});
        }
    },

    async findOne(ctx)  {
        const {id} = ctx.query;

        try {
            const entity = await strapi.db.query('api::editor.editor').findOne({
                where: {id},
                populate: {article: true, user:true}
            });

            //return 404 if editor not found
            if(!entity) {
                return ctx.notFound("Editor not found");
            }

            return {data: entity};
        } catch (error) {
            ctx.throw(400, 'Error fetching the editor', {error})
        }
    },

    async create(ctx) {
        const {id} = ctx.params;
        const user = ctx.state;

        //article will be sent to an editor for approval
        // once it approved, the article is published
        // editor can send a feedback to the arthour for improvement

        try {
            const data = { ...ctx.request.body?.data };

            if(user.role.name !== 'editor') {
                ctx.forbidden('Not allowed to approve the article');
            }

            if(data.status === 'draft') {
                data.status === 'published';
            }

            const entity = ctx.strapi.query('api::editor.editor').crate({data});

            return {data: entity};
        } catch (error) {
            return ctx.throw(400, 'Error approving the article', {error});
        }
    }
}))