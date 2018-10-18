exports.seed = function(knex, Promise) {
  return knex('emails').del()
    .then(function () {
      return Promise.all([
        knex('emails').insert({id: 1, name: 'Suzie', emailtext: 'suzie@suzie.com'}),
        knex('emails').insert({id: 2, name: 'Tommy', emailtext: 'spaghetti@slime.com'}),
        knex('emails').insert({id: 3, name: 'Robbie', emailtext: 'cool@youare.com'}),
      ]);
    });
};
