exports.seed = function(knex, Promise) {
  return knex('usersdates').del()
    .then(function () {
      return Promise.all([
        knex('usersdates').insert({id: 1, userid: 1, dateid: 1, available: 1}),
        knex('usersdates').insert({id: 2, userid: 1, dateid: 2, available: 1}),
        knex('usersdates').insert({id: 3, userid: 1, dateid: 3, available: 0}),

        knex('usersdates').insert({id: 4, userid: 2, dateid: 1, available: 1}),
        knex('usersdates').insert({id: 5, userid: 2, dateid: 2, available: 0}),
        knex('usersdates').insert({id: 6, userid: 2, dateid: 3, available: 1}),

        knex('usersdates').insert({id: 7, userid: 3, dateid: 1, available: 1}),
        knex('usersdates').insert({id: 8, userid: 3, dateid: 2, available: 1}),
        knex('usersdates').insert({id: 9, userid: 3, dateid: 3, available: 0}),

        knex('usersdates').insert({id: 10, userid: 4, dateid: 4, available: 1}),
        knex('usersdates').insert({id: 11, userid: 4, dateid: 5, available: 1}),
        knex('usersdates').insert({id: 12, userid: 4, dateid: 6, available: 0}),

        knex('usersdates').insert({id: 13, userid: 5, dateid: 4, available: 1}),
        knex('usersdates').insert({id: 14, userid: 5, dateid: 5, available: 1}),
        knex('usersdates').insert({id: 15, userid: 5, dateid: 6, available: 0}),

        knex('usersdates').insert({id: 16, userid: 6, dateid: 4, available: 1}),
        knex('usersdates').insert({id: 17, userid: 6, dateid: 5, available: 0}),
        knex('usersdates').insert({id: 18, userid: 6, dateid: 6, available: 0}),

        knex('usersdates').insert({id: 19, userid: 7, dateid: 7, available: 1}),
        knex('usersdates').insert({id: 20, userid: 7, dateid: 8, available: 0}),
        knex('usersdates').insert({id: 21, userid: 7, dateid: 9, available: 1}),

        knex('usersdates').insert({id: 22, userid: 8, dateid: 7, available: 0}),
        knex('usersdates').insert({id: 23, userid: 8, dateid: 8, available: 1}),
        knex('usersdates').insert({id: 24, userid: 8, dateid: 9, available: 1}),

        knex('usersdates').insert({id: 25, userid: 9, dateid: 7, available: 0}),
        knex('usersdates').insert({id: 26, userid: 9, dateid: 8, available: 0}),
        knex('usersdates').insert({id: 27, userid: 9, dateid: 9, available: 1}),

      ]);
    });
};
