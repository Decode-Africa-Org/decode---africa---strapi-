module.exports = {
    async up(knex) {
        await knex.schema.createTable('media', (table) => {
            table.uuid('uuidColumn', {primaryKey:true}).defaultTo(knex.fn.uuid());
            table.uuid('article_id').references('uuidColumn').inTable('articles').onDelete('CASCADE');
            table.string('type');
            table.string('url');
        });
    },
    async down(knex) {
        await knex.schema.dropTableIfExists('media');
    }
}
