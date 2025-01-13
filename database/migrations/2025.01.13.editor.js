// database migrations for editors

module.exports = {
    async up(knex) {
        await knex.schema.createTable('editors', (table) => {
            table.uuid('uuidColumn').primary().defaultTo(knex.fn.uuid()); //table.increments();
            table.uuid('article_id').references('uuidColumn').inTable('articles').onDelete('CASCADE');
            table.uuid('user_id').references('uuidColumn').inTable('users').onDelete('CASCADE');
            table.string('status');

        });
    }
}