module.exports = {
    async up(knex)  {
        await knex.schema.createTable('bookmark', t=> {
            t.uuid('uuidColumn', {primaryKey:true});
            t.uuid('discover_id').references('uuidColumn').inTable('article');
            t.uuid('user_id').references('uuidColumn').inTable('user');
        })
    }
}