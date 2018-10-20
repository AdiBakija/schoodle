
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('dates', function(table) {
        table.string('datetime');
        table.string('enddatetime');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('dates', function(date) {
      table.dropColumn('datetime');
      table.dropColumn('enddatetime');
    })
  ])
};
