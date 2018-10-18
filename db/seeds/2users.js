exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1000, name: 'Alice', eventid: 1000}),
        knex('users').insert({id: 2000, name: 'Bob', eventid: 1000}),
        knex('users').insert({id: 3000, name: 'Charlie', eventid: 1000}),
        knex('users').insert({id: 4000, name: 'Harry', eventid: 2000}),
        knex('users').insert({id: 5000, name: 'Hermoine', eventid: 2000}),
        knex('users').insert({id: 6000, name: 'Ron', eventid: 2000}),
        knex('users').insert({id: 7000, name: 'Draco', eventid: 3000}),
        knex('users').insert({id: 8000, name: 'Lupin', eventid: 3000}),
        knex('users').insert({id: 9000, name: 'Umbridge', eventid: 3000}),
      ]);
    });
};
