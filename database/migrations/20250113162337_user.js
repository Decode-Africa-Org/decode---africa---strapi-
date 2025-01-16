module.exports = {
        async up(knex)      {
                await knex.schema.createTable('user', t => {
                        t.uuid('uuidColumn', {primaryKey:true}).defaultTo(knex.fn.uuid());
                        t.string('username');
                        t.string('email');
                        t.string('password');
                        t.string('avatar');
                        //references to user perferences
                        //references discovery that the user has bookmarked
                        t.timestamp('date_joined', { useTz: true }).defaultTo(knex.fn.now());
                });

                await knex.schema.alterTable('user', t => {
                        t.unique('email').alter()
                })
        },

        async down(knex) {
                await knex.schema.dropTableIfExists('user');  
        }
}