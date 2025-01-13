// database migrations for categories

module.exports = {
    async up(knex) {
        await knex.schema.createTable('categories', (table) => {
            //table.increments();
            table.uuid('uuidColumn').primary().defaultTo(knex.fn.uuid());
            table.string('name');
        });
    }
}