exports.seed = function(knex, Promise) {
  return knex('eventsemails').del()
    .then(function () {
      return Promise.all([
        knex('eventsemails').insert({id: 1, eventid: 1, emailid: 1}),
        knex('eventsemails').insert({id: 2, eventid: 2, emailid: 2}),
        knex('eventsemails').insert({id: 3, eventid: 3, emailid: 3})
      ]);
    });
};
