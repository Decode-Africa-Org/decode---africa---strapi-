// database migrations for users

module.exports = {
    async up(knex) {
        await knex.schema.createTable('users', (table) => {
            table.uuid('uuidColumn').defaultTo(knex.fn.uuid());
            table.string('first_name').notNullable();
            table.string('last_name').notNullable();
            table.string('email').unique({ indexName: 'user_unique_email', deferrable: 'immediate' });
            table.string('password', 255).notNullable();
            table.string('avatar');
            table.string('bio');
            table.string('role').defaultTo('user');
            table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
            table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
        });
        await knex.schema.alterTable('users', (table) => {
            table.unique('uuidColumn');
        });
    },
    async down(knex) {
        await knex.schema.dropTableIfExists('users');
    }
}