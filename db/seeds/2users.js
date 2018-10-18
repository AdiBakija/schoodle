exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, name: 'Alice', eventid: 1000}),
        knex('users').insert({id: 2, name: 'Bob', eventid: 1000}),
        knex('users').insert({id: 3, name: 'Charlie', eventid: 1000}),
        knex('users').insert({id: 4, name: 'Harry', eventid: 2000}),
        knex('users').insert({id: 5, name: 'Hermoine', eventid: 2000}),
        knex('users').insert({id: 6, name: 'Ron', eventid: 2000}),
        knex('users').insert({id: 7, name: 'Draco', eventid: 3000}),
        knex('users').insert({id: 8, name: 'Lupin', eventid: 3000}),
        knex('users').insert({id: 9, name: 'Umbridge', eventid: 3000}),
      ]);
    });
};
