// database migrations for comments

module.exports = {
    async up(knex) {
        await knex.schema.createTable('comments', (table) => {
            table.uuid('uuidColumn').primary().defaultTo(knex.fn.uuid());
            table.string('content');
            table.uuid('user_id').references('uuidColumn').inTable('users');
            table.uuid('article_id').references('uuidColumn').inTable('articles');
            table.uuid('interaction_id').references('uuidColumn').inTable('interactions');
            table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
            table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
        });
    }
}