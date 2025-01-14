module.exports = {
    async up(knex)  {
        await knex.schema.createTable('editors', (table) => {
            table.uuid('uuidColumn', {primaryKey:true}).defaultTo(knex.fn.uuid()); //table.increments();
            table.uuid('article_id').references('uuidColumn').inTable('articles').onDelete('CASCADE');
            table.uuid('user_id').references('uuidColumn').inTable('users').onDelete('CASCADE');
            table.string('status');
            table.string('feedback');
        });
    },
    async down(knex)    {
        await knex.schema.dropTableIfExists('editors');
    }
}
