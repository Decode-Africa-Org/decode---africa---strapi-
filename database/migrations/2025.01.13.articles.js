// database migrations for articles

module.exports = {
    async up(knex) {
        await knex.schema.createTable('articles', (table) => {
            table.uuid('uuidColumn').primary().defaultTo(knex.fn.uuid()); //table.increments();
            table.string('title');
            table.string('content');
            table.uuid('user_id').references('uuidColumn').inTable('users');
            table.uuid('category_id').references('uuidColumn').inTable('categories');
            table.uuid('tag_id').references('uuidColumn').inTable('tags');
            table.uuid('interaction_id').references('uuidColumn').inTable('interactions');
            table.uuid('comment_id').references('uuidColumn').inTable('comments');
            table.uuid('media_id').references('uuidColumn').inTable('media');
            table.timestamp('published_at', { useTz: true }).defaultTo(knex.fn.now());
            table.uuid('seo_meta_tag_id').references('uuidColumn').inTable('seo_meta_tags');
            table.uuid('editor_id').references('uuidColumn').inTable('editors');
        });
    }
}