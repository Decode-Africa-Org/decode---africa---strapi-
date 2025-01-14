module.exports = {
    async up(knex)  {
        await knex.schema.createTable('interactions', (table) => {
            table.uuid('uuidColumn', {primaryKey:true}).defaultTo(knex.fn.uuid());
            table.uuid('article_id').references('uuidColumn').inTable('articles').onDelete('CASCADE');
            table.uuid('user_id').references('uuidColumn').inTable('users').onDelete('CASCADE');
            table.string('type');
        });
    },
    async down(knex)    {
        await knex.schema.dropTableIfExists('interactions');
    }
}
