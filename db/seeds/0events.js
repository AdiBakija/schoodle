exports.seed = function(knex, Promise) {
  return knex('events').del()
    .then(function () {
      return Promise.all([
        knex('events').insert({
                id: 1,
                url: 'abcdefg',
                title: 'Alices Party',
                description: 'for birthday',
                location: "Chuck-e-Cheese",
                closed: 0,
                finaldateid: null,
                creatoremailid: 1
        }),
        knex('events').insert({
                id: 2,
                url: '1234567',
                title: 'LAN Party',
                description: 'Warcraft Though',
                location: 'Moms Basement',
                closed: 0,
                finaldateid: null,
                creatoremailid: 2
        }),
        knex('events').insert({
                id: 3,
                url: '12345678',
                title: 'MLM Tupperware Party',
                description: 'Buy really cool stuff',
                location: 'Somebodys Kitchen',
                closed: 1,
                finaldateid: null,
                creatoremailid: 3
        })

      ]);
    });
};
