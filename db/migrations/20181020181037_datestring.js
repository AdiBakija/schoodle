
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('dates', function(table) {
      table.dropColumn('enddatetime')
      table.dropColumn('datetime')

    }).then(()=> {
      knex.schema.table('dates', function(table) {
        table.string('datetime')
        table.string('enddatetime')
      })
    })


  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('dates', function(table) {
      table.dropColumn('enddatetime')
      table.dropColumn('datetime')

      table.dateTime('datetime')
      table.dateTime('enddatetime')
    })
  ])

};
