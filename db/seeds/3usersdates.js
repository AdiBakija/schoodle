exports.seed = function(knex, Promise) {
  return knex('usersdates').del()
    .then(function () {
      return Promise.all([
        knex('usersdates').insert({id: 1000, userid: 1000, dateid: 1000, available: 1}),
        knex('usersdates').insert({id: 2000, userid: 1000, dateid: 2000, available: 1}),
        knex('usersdates').insert({id: 3000, userid: 1000, dateid: 3000, available: 0}),

        knex('usersdates').insert({id: 4000, userid: 2000, dateid: 1000, available: 1}),
        knex('usersdates').insert({id: 5000, userid: 2000, dateid: 2000, available: 0}),
        knex('usersdates').insert({id: 6000, userid: 2000, dateid: 3000, available: 1}),

        knex('usersdates').insert({id: 7000, userid: 3000, dateid: 1000, available: 1}),
        knex('usersdates').insert({id: 8000, userid: 3000, dateid: 2000, available: 1}),
        knex('usersdates').insert({id: 9000, userid: 3000, dateid: 3000, available: 0}),

        knex('usersdates').insert({id: 10000, userid: 4000, dateid: 4000, available: 1}),
        knex('usersdates').insert({id: 11000, userid: 4000, dateid: 5000, available: 1}),
        knex('usersdates').insert({id: 12000, userid: 4000, dateid: 6000, available: 0}),

        knex('usersdates').insert({id: 13000, userid: 5000, dateid: 4000, available: 1}),
        knex('usersdates').insert({id: 14000, userid: 5000, dateid: 5000, available: 1}),
        knex('usersdates').insert({id: 15000, userid: 5000, dateid: 6000, available: 0}),

        knex('usersdates').insert({id: 16000, userid: 6000, dateid: 4000, available: 1}),
        knex('usersdates').insert({id: 17000, userid: 6000, dateid: 5000, available: 0}),
        knex('usersdates').insert({id: 18000, userid: 6000, dateid: 6000, available: 0}),

        knex('usersdates').insert({id: 19000, userid: 7000, dateid: 7000, available: 1}),
        knex('usersdates').insert({id: 20000, userid: 7000, dateid: 8000, available: 0}),
        knex('usersdates').insert({id: 21000, userid: 7000, dateid: 9000, available: 1}),

        knex('usersdates').insert({id: 22000, userid: 8000, dateid: 7000, available: 0}),
        knex('usersdates').insert({id: 23000, userid: 8000, dateid: 8000, available: 1}),
        knex('usersdates').insert({id: 24000, userid: 8000, dateid: 9000, available: 1}),

        knex('usersdates').insert({id: 25000, userid: 9000, dateid: 7000, available: 0}),
        knex('usersdates').insert({id: 26000, userid: 9000, dateid: 8000, available: 0}),
        knex('usersdates').insert({id: 27000, userid: 9000, dateid: 9000, available: 1}),

      ]);
    });
};
