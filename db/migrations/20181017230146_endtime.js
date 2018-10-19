
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('dates', function(table) {
      table.dateTime('enddatetime');

    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('dates', function (table) {
      table.dropColumn('enddatetime');
    })
  ])

};
