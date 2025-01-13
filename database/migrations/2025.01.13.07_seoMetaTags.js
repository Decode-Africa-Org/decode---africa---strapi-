// database migrations for seo meta tags

module.exports = {
    async up(knex) {
        await knex.schema.createTable('seo_meta_tags', (table) => {
            table.uuid('uuidColumn').primary().defaultTo(knex.fn.uuid()); //table.increments();
            table.enu('keywords', []);
        });
    }
}