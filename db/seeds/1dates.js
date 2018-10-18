exports.seed = function(knex, Promise) {
  return knex('dates').del()
    .then(function () {
      return Promise.all([
        knex('dates').insert({
            id: 1000,
            eventid: 1000,
            datetime: '2018/12/01 09:00:00+05',
            enddatetime: '2018/12/01 10:00:00+05'
        }),
        knex('dates').insert({
            id: 2000,
            eventid: 1000,
            datetime: '2018/12/02 09:00',
            enddatetime: '2018/12/02 10:00'
        }),
        knex('dates').insert({
            id: 3000,
            eventid: 1000,
            datetime: '2018/12/03 09:00',
            enddatetime: '2018/12/03 10:00'
        }),
        knex('dates').insert({
            id: 4000,
            eventid: 2000,
            datetime: '2018/12/04 09:00',
            enddatetime: '2018/12/04 10:00'
        }),
        knex('dates').insert({
            id: 5000,
            eventid: 2000,
            datetime: '2018/12/05 09:00',
            enddatetime: '2018/12/05 10:00'
        }),
        knex('dates').insert({
            id: 6000,
            eventid: 2000,
            datetime: '2018/12/06 09:00',
            enddatetime: '2018/12/06 10:00:00+05'
        }),
        knex('dates').insert({
            id: 7000,
            eventid: 3000,
            datetime: '2018/12/07 09:00',
            enddatetime: '2018/12/07 10:00'
        }),
        knex('dates').insert({
            id: 8000,
            eventid: 3000,
            datetime: '2018/12/08 09:00',
            enddatetime: '2018/12/08 10:00'
        }),
        knex('dates').insert({
            id: 9000,
            eventid: 3000,
            datetime: '2018/12/09 09:00',
            enddatetime: '2018/12/09 10:00'
        })
      ]);
    });
};
