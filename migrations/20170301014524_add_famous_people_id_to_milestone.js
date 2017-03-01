
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestone', function (table) {
      table.integer('famous_person_id').unsigned()
      table.foreign('famous_person_id').references('famous_people.id')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropForeign('famous_person_id')
  ]);
};
