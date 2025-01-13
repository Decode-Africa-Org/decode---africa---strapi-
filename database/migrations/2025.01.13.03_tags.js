// database migrations for tags

module.exports = {
    async up(knex) {
        await knex.schema.createTable('tags', (table) => {
            table.uuid('uuidColumn').primary().defaultTo(knex.fn.uuid());
            table.enu('keywords', []);

        });
    }
}