exports.seed = function(knex, Promise) {
  return knex('emails').del()
    .then(function () {
      return Promise.all([
        knex('emails').insert({id: 1000, name: 'Suzie', emailtext: 'suzie@suzie.com'}),
        knex('emails').insert({id: 2000, name: 'Tommy', emailtext: 'spaghetti@slime.com'}),
        knex('emails').insert({id: 3000, name: 'Robbie', emailtext: 'cool@youare.com'}),
      ]);
    });
};
