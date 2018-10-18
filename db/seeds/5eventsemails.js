exports.seed = function(knex, Promise) {
  return knex('eventsemails').del()
    .then(function () {
      return Promise.all([
        knex('eventsemails').insert({id: 1, eventid: 1000, emailid: 1000}),
        knex('eventsemails').insert({id: 2, eventid: 2000, emailid: 2000}),
        knex('eventsemails').insert({id: 3, eventid: 3000, emailid: 3000})
      ]);
    });
};
