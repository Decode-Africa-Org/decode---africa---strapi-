module.exports = {
    async up(knex) {
        await knex.schema.createTable('comments', (table) => {
            table.uuid('uuidColumn', {primaryKey:true}).defaultTo(knex.fn.uuid());
            table.uuid('article_id').references('uuidColumn').inTable('articles').onDelete('CASCADE');
            table.uuid('user_id').references('uuidColumn').inTable('users').onDelete('CASCADE');
            table.text('content');
            table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
            table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
        });
    },
    async down(knex)    {
        await knex.schema.dropTableIfExists('comments');
    }
}
