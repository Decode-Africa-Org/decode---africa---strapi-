// database migrations for media

module.exports = {
    async up(knex) {
        await knex.schema.createTable('media', (table) => {
            table.uuid('uuidColumn').primary().defaultTo(knex.fn.uuid()); //table.increments();
            table.string('url');
            table.string('type');
            table.uuid('article_id').references('uuidColumn').inTable('articles');
            table.string('alt_text');
            table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
            table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
        });
    }
}