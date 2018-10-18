
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('events', function(table){
      table.increments('id').notNullable().primary();
      table.string('url');
      table.string('title');
      table.string('description');
      table.string('location');
      table.boolean('closed')
      table.string('creatorName');
      table.string('creatorEmail');
      table.integer('finaldateid');

      table.foreign('finaldateid').references('id').inTable('dates').onDelete('cascade');
    }),

    knex.schema.table('users', function(table) {
      table.integer('eventid');

      table.foreign('eventid').references('id').inTable('events').onDelete('cascade');
    }),

    knex.schema.createTable('dates', function(table) {
      table.increments('id').notNullable().primary();
      table.integer('eventid');
      table.dateTime('datetime');

      table.foreign('eventid').references('id').inTable('events').onDelete('cascade');
    }),

    knex.schema.createTable('usersdates', function(table) {
      table.increments('id').notNullable().primary();
      table.integer('userid').notNullable;
      table.integer('dateid').notNullable;
      table.integer('available');

      table.foreign('userid').references('id').inTable('users').onDelete('cascade');
      table.foreign('dateid').references('id').inTable('dates').onDelete('cascade');

    }),

  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('events'),
    knex.schema.dropTable('dates'),
    knex.schema.dropTable('usersdates'),

    knex.schema.table('users', function (table) {
      table.dropColumn('eventid');
    }),
  ])
};
