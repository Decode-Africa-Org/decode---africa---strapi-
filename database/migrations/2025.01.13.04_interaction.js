// database migrations for interactions

module.exports = {
  async up(knex) {
    await knex.schema.createTable('interactions', (table) => {
      table.uuid('uuidColumn').primary().defaultTo(knex.fn.uuid());
      table.uuid('user_id').references('uuidColumn').inTable('users');
      table.uuid('article_id').references('uuidColumn').inTable('articles');
      table.string('type');
      table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
      table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
    });
    // await knex.schema.alterTable('interactions', (table) => {
    //   table.unique('uuidColumn');
    // });
  },
  
  async down(knex) {
    await knex.schema.dropTableIfExists('interactions');
  }
};
