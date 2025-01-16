module.exports={
    async up(knex)  {
        await knex.schema.createTable('tags', (table) => {
            table.uuid('uuidColumn', {primaryKey:true}).defaultTo(knex.fn.uuid());
            table.string('name');
            table.string('discription');
        });
    },
    async down(knex)    {
        await knex.schema.dropTableIfExists('tags');
    }
}
