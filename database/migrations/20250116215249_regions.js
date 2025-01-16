module.exports = {
    async up(knex)   {
        await knex.schema.createTable('region', t => {
            t.uuid('uuidColumn', {primary: true}),
            t.string('region');
            t.string('country');
        })
    },
    async down(knex)    {
        await knex.schema.dropTableIfExists('region');
    }
}