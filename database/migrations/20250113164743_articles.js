module.exports = {
    async up(knex)  {
        await knex.schema.createTable('articles', (table) => {
            table.uuid('uuidColumn', {primaryKey:true}).defaultTo(knex.fn.uuid());
            table.string('title');
            table.text('content');
            table.string('image');
            table.string('status').defaultTo('draft');
            table.uuid('user_id').references('uuidColumn').inTable('users');
            table.uuid('category_id').references('uuidColumn').inTable('categories');
            table.uuid('tag_id').references('uuidColumn').inTable('tags');
            table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
            table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
        });
    },
    async down(knex)    {
        await knex.schema.dropTableIfExists('articles');
    }
}