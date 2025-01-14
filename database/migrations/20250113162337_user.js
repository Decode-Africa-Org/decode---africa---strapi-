module.exports = {
        async up(knex)      {
                await knex.schema.createTable('user', t => {
                        t.uuid('uuidColumn', {primaryKey:true}).defaultTo(knex.fn.uuid());
                        t.string('firstName');
                        t.string('secondName');
                        t.string('email');
                        t.string('password');
                        t.string('avatar');
                        t.text('bio');
                        t.string('role').defaultTo('user');
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