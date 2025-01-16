module.exports={
    async up(knex)  {
        await knex.schema.createTable('categories', (table) => {
            table.uuid('uuidColumn', {primaryKey:true}).defaultTo(knex.fn.uuid());
            table.string('name');
            table.text('discription');
        });
    },
    async down(knex)    {
        await knex.schema.dropTableIfExists('categories');
    }
};
