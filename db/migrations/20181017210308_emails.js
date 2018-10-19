
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('emails', function(table){
      table.increments('id').notNullable().primary();
      table.string('emailtext');
      table.string('name');
    }),

    knex.schema.createTable('eventsemails', function(table) {
      table.increments('id').notNullable().primary();
      table.integer('eventid');
      table.integer('emailid');

      table.foreign('eventid').references('id').inTable('events').onDelete('cascade');
      table.foreign('emailid').references('id').inTable('emails').onDelete('cascade');
    }),
    knex.schema.table('events', function (table) {
      table.dropColumn('creatorName');
      table.dropColumn('creatorEmail');

      table.integer('creatoremailid');

      table.foreign('creatoremailid').references('id').inTable('emails').onDelete('cascade');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('emails'),
    knex.schema.dropTable('eventsemails')
  ])
};
