exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, name: 'Alice', eventid: 1}),
        knex('users').insert({id: 2, name: 'Bob', eventid: 1}),
        knex('users').insert({id: 3, name: 'Charlie', eventid: 1}),
        knex('users').insert({id: 4, name: 'Harry', eventid: 2}),
        knex('users').insert({id: 5, name: 'Hermoine', eventid: 2}),
        knex('users').insert({id: 6, name: 'Ron', eventid: 2}),
        knex('users').insert({id: 7, name: 'Draco', eventid: 3}),
        knex('users').insert({id: 8, name: 'Lupin', eventid: 3}),
        knex('users').insert({id: 9, name: 'Umbridge', eventid: 3}),
      ]);
    });
};
