exports.seed = function(knex, Promise) {
  return knex('dates').del()
    .then(function () {
      return Promise.all([
        knex('dates').insert({
            id: 1,
            eventid: 1,
            datetime: '2018/12/01 09:00:00+05',
            enddatetime: '2018/12/01 10:00:00+05'
        }),
        knex('dates').insert({
            id: 2,
            eventid: 1,
            datetime: '2018/12/02 09:00',
            enddatetime: '2018/12/02 10:00'
        }),
        knex('dates').insert({
            id: 3,
            eventid: 1,
            datetime: '2018/12/03 09:00',
            enddatetime: '2018/12/03 10:00'
        }),
        knex('dates').insert({
            id: 4,
            eventid: 2,
            datetime: '2018/12/04 09:00',
            enddatetime: '2018/12/04 10:00'
        }),
        knex('dates').insert({
            id: 5,
            eventid: 2,
            datetime: '2018/12/05 09:00',
            enddatetime: '2018/12/05 10:00'
        }),
        knex('dates').insert({
            id: 6,
            eventid: 2,
            datetime: '2018/12/06 09:00',
            enddatetime: '2018/12/06 10:00:00+05',
            enddatetime: '2018/12/06 10:00'
        }),
        knex('dates').insert({
            id: 7,
            eventid: 3,
            datetime: '2018/12/07 09:00',
            enddatetime: '2018/12/07 10:00'
        }),
        knex('dates').insert({
            id: 8,
            eventid: 3,
            datetime: '2018/12/08 09:00',
            enddatetime: '2018/12/08 10:00'
        }),
        knex('dates').insert({
            id: 9,
            eventid: 3,
            datetime: '2018/12/09 09:00',
            enddatetime: '2018/12/09 10:00'
        })
      ]);
    });
};
