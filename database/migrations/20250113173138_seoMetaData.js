module.exports = {
    async up(knex) {
        await knex.schema.createTable('seo_meta_data', (table) => { 
            table.uuid('uuidColumn', {primaryKey:true}).defaultTo(knex.fn.uuid());
            table.uuid('article_id').references('uuidColumn').inTable('articles').onDelete('CASCADE');
            table.string('title');
            table.string('description');
        });
    },
    async down(knex)    {
        await knex.schema.dropTableIfExists('seo_meta_data');
    }
}
